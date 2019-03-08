const jwtAuth = require('socketio-jwt-auth');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const User = require('../databases/mongo/models/User');
const Cards = require('../databases/mongo/models/Cards');
const client = require('../databases/redis/client');
// const { permission } = require('../config/permission');
// const joinRoom = require('../socket/onJoinRoom');
global.permission = true;

const {
  sendJoinRoomInfo,
  sendChatRoomInfo,
  deleteFromDatabase,
  writeJoinRoomSocketInfo
} = require('./socketRedis');

const jwtAuthSocket = bool => {
  return jwtAuth.authenticate(
    {
      secret, // required, used to verify the token's signature
      algorithm: 'HS256', // optional, default to be HS256
      succeedWithoutToken: bool
    },

    (payload, done) => {
      console.log('Payload in AUTH ', payload);
      // you done callback will not include any payload data now
      // if no token was supplied
      if (payload && payload.id) {
        User.findById(payload.id, function(err, user) {
          if (err) {
            // return error
            return done(err);
          }
          if (!user) {
            // return fail with an error message
            return done(null, false, 'user does not exist');
          }
          // return success with a user info
          console.log('Authentication passed!!!');
          return done(null, user);
        });
      } else {
        console.log('Authentication Failed! You are enter as a guest!!!');
        return done(); // in your connection handler user.logged_in will be false
      }
    }
  );
};

// initial prepare
const rooms = ['game1'];

client.del('avatar1');
client.del('username1');
client.del('socketsId1');
client.del('playersNumber1');
client.del('associations1');
client.del('chatMessages1');
client.del('chatAvatars1');
client.del('chatUserNames1');
client.del('chatSocketsId1');
client.del('chatDates1');
client.del('ifGameStarted1');

const roomArrays = [
  `avatar${rooms[0].split('')[4]}`,
  `username${rooms[0].split('')[4]}`,
  `socketsId${rooms[0].split('')[4]}`,
  `associations${rooms[0].split('')[4]}`,
  `chatMessages${rooms[0].split('')[4]}`,
  `chatAvatars${rooms[0].split('')[4]}`,
  `chatUserNames${rooms[0].split('')[4]}`,
  `chatSocketsId${rooms[0].split('')[4]}`,
  `chatDates${rooms[0].split('')[4]}`
];
client.set(`playersNumber${rooms[0].split('')[4]}`, 0);
client.set(`ifGameStarted${rooms[0].split('')[4]}`, false);

let playersNumber = 0;

const cards = [];

const socketConnect = io => {
  io.on('connection', socket => {
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    let { user } = socket.request;
    // room name for current scope
    let socketRoom;
    // number of players in the room

    const joinRoom = async room => {
      console.log('joinRoom permission', permission);
      if (permission) {
        permission = false;
        if (rooms.includes(room) && playersNumber < 10) {
          playersNumber += 1;
          console.log('playersNumber', playersNumber);
          socket.join(room);
          socketRoom = room;
          await sendJoinRoomInfo(socket, room);
          await sendChatRoomInfo(socket, room);
          await io.in(room).emit('action', {
            type: 'ADD_PLAYER',
            avatar: user.avatar,
            username: user.name,
            socketsId: socket.id
          });
          await writeJoinRoomSocketInfo(user, room, socket);

          socket.to(room).emit('newUser', {
            message: `New player has joined to the room ${room}`
          });
          permission = true;
          console.log(
            `New player has joined to the room ${room} with id`,
            socket.id
          );
        } else {
          socket.emit('error', 'Error, no room with such name existed');
          socket.disconnect();
        }
      } else {
        setTimeout(() => joinRoom(room), 1000);
      }
    };

    socket.on('joinRoom', room => joinRoom(room));
    //   async room => {
    //   if (rooms.includes(room) && playersNumber < 10) {
    //     playersNumber += 1;
    //     console.log('playersNumber', playersNumber);
    //     socket.join(room);
    //     socketRoom = room;
    //
    //     await sendJoinRoomInfo(socket, room);
    //     await io.in(room).emit('action', {
    //       type: 'ADD_PLAYER',
    //       avatar: user.avatar,
    //       username: user.name,
    //       socketsId: socket.id
    //     });
    //     await writeJoinRoomSocketInfo(user, room, socket);
    //
    //     socket.to(room).emit('newUser', {
    //       message: `New player has joined to the room ${room}`
    //     });
    //     console.log(
    //       `New player has joined to the room ${room} with id`,
    //       socket.id
    //     );
    //   } else {
    //     socket.emit('error', 'Error, no room with such name existed');
    //     socket.disconnect();
    //   }
    // });

    console.log(socket.id);

    socket.emit('success', {
      message: 'success logged in!'
    });

    socket.on('action', action => {
      switch (action.type) {
        case 'GET_AVATAR':
          return socket.emit('action', {
            type: 'GET_AVATAR',
            avatar: user.avatar
          });
        case 'Authentication':
          const { token } = action;
          if (token) {
            jwt.verify(token, secret, (err, payload) => {
              // if (err.name === 'TokenExpiredError') {
              //   console.log('socket expired');
              //   return socket.emit('action', {
              //     type: 'SOCKET_ERROR',
              //     message: 'socket expired'
              //   });
              // }
              User.findById(payload.id).then(data => {
                if (!data) {
                  socket.emit('error', {
                    message: 'Game authentication: user not exist'
                  });
                }
                user = data;
                user.logged_in = true;
                console.log(user);
                console.log(socket.id);
                socket.emit('action', {
                  type: 'USER_INFO',
                  avatar: user.avatar,
                  username: user.name,
                  socketId: socket.id
                });
                return socket.emit('joinRoom', { isAuthenticated: true });
              });
            });
          }
          break;
        case 'INFO_ABOUT_START':
          return socket.to(socketRoom).emit('action', {
            type: 'INFO_ABOUT_START',
            message: action.message
          });
        case 'REPORT_ASSOCIATION':
          // eslint-disable-next-line prettier/prettier
          client.rpush(`associations${socketRoom.split('')[4]}`, `${action.association}`);
          // eslint-disable-next-line prettier/prettier
          client.lrange(`associations${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
              console.log(value);
            }
          );
          return io.in(socketRoom).emit('action', {
            type: 'REPORT_ASSOCIATION',
            association: action.association
          });
        case 'CHAT_MESSAGE':
          client.rpush(
            `chatMessages${socketRoom.split('')[4]}`,
            `${action.message}`
          );
          client.rpush(
            `chatAvatars${socketRoom.split('')[4]}`,
            `${action.avatar}`
          );
          client.rpush(
            `chatUserNames${socketRoom.split('')[4]}`,
            `${action.username}`
          );
          client.rpush(
            `chatSocketsId${socketRoom.split('')[4]}`,
            `${action.socketId}`
          );
          client.rpush(`chatDates${rooms[0].split('')[4]}`, `${action.date}`);
          client.llen(
            `chatMessages${socketRoom.split('')[4]}`,
            (err, value) => {
              if (value > 30) {
                client.ltrim(`chatMessages${socketRoom.split('')[4]}`, 1, 30);
                client.ltrim(`chatAvatars${socketRoom.split('')[4]}`, 1, 30);
                client.ltrim(`chatUserNames${socketRoom.split('')[4]}`, 1, 30);
                client.ltrim(`chatSocketsId${socketRoom.split('')[4]}`, 1, 30);
                client.ltrim(`chatDates${socketRoom.split('')[4]}`, 1, 30);
              }
            }
          );
          // eslint-disable-next-line prettier/prettier
          client.lrange(`chatMessages${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
              console.log(value);
            }
          );
          return socket.to(socketRoom).emit('action', {
            type: 'CHAT_MESSAGE',
            message: action.message,
            avatar: action.avatar,
            username: action.username,
            socketId: action.socketId,
            date: action.date
          });
        case 'HANG_OUT_THE_CARDS_SERVER':
          const hangOutCards = () => {
            const num = Math.ceil(Math.random() * 10);
            console.log(num);
            let count = 0;
            while (count < num) {
              count += 1;
              cards.sort(() => {
                return 0.5 - Math.random();
              });
            }
          };
          Cards.find({})
            .sort({ field: 'desc' })
            .then(data => {
              data.map(element => cards.push(element.url));
              hangOutCards();
              console.log(cards);
              console.log('playersNumber Cards', playersNumber);
              // eslint-disable-next-line prettier/prettier
              client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
                  console.log('socketsId', value);
                  const readyCards = [];
                  value.forEach(() => {
                    readyCards.push({
                      type: 'HANG_OUT_THE_CARDS',
                      playerCards: []
                    });
                  });
                  let count = 0;
                  while (count < 5) {
                    value.forEach((element, index) =>
                      readyCards[index].playerCards.push(cards.shift())
                    );
                    count += 1;
                  }
                  console.log('readyCards', readyCards);
                  console.log('cards after', cards);
                  value.forEach((element, index) =>
                    io.to(value[index]).emit('action', readyCards[index])
                  );
                }
              );
            })
            .catch(error => console.log(error));
          break;
        case 'CHANGE_GAME_STATUS':
          return socket.to(socketRoom).emit('action', {
            type: 'CHANGE_GAME_STATUS',
            status: action.status
          });
        case 'START_GAME':
          client.set(`ifGameStarted${rooms[0].split('')[4]}`, true);
          return socket.to(socketRoom).emit('action', {
            type: 'START_GAME',
            ifGameStarted: action.ifGameStarted
          });
        case 'TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS':
          return socket.to(socketRoom).emit('action', {
            type: 'TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS',
            src: action.src
          });
        default:
      }
    });

    console.log('a user connected');
    client.set('string key', 'string val');
    client.get('string key', (e, value) => {
      console.log(value);
    });

    socket.on('disconnecting', () => {
      // console.log(io.sockets.adapter.rooms[socketRoom].sockets[socket.id]);
      if (
        io.sockets.adapter.rooms[socketRoom] !== undefined &&
        io.sockets.adapter.rooms[socketRoom].sockets[socket.id]
      ) {
        socket.leave(socketRoom);
        io.in(socketRoom).emit('action', {
          type: 'DELETE_PLAYER',
          socketId: socket.id
        });
        playersNumber -= 1;
        deleteFromDatabase(socketRoom, socket, roomArrays, io);
      }
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
      // number of all connections
      // console.log(io.engine.clientsCount);
    });
  });
};

module.exports = {
  jwtAuthSocket,
  socketConnect
};
