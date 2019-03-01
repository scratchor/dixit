const jwtAuth = require('socketio-jwt-auth');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const User = require('../databases/mongo/models/User');
const client = require('../databases/redis/client');
const { permission } = require('../config/permission');

const {
  sendJoinRoomInfo,
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

const roomArrays = [
  `avatar${rooms[0].split('')[4]}`,
  `username${rooms[0].split('')[4]}`,
  `socketsId${rooms[0].split('')[4]}`,
  `associations${rooms[0].split('')[4]}`
];
client.set(`playersNumber${rooms[0].split('')[4]}`, 0);
let playersNumber = 0;
const socketConnect = io => {
  io.on('connection', socket => {
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    let { user } = socket.request;
    // room name for current scope
    let socketRoom;
    // number of players in the room

    socket.on('joinRoom', async room => {
      if (rooms.includes(room) && playersNumber < 10) {
        playersNumber += 1;
        console.log('playersNumber', playersNumber);
        socket.join(room);
        socketRoom = room;

        await sendJoinRoomInfo(socket, room);
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
        console.log(
          `New player has joined to the room ${room} with id`,
          socket.id
        );
      } else {
        socket.emit('error', 'Error, no room with such name existed');
        socket.disconnect();
      }
    });

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
      // number of all connetion
      // console.log(io.engine.clientsCount);
    });
  });
};

module.exports = {
  jwtAuthSocket,
  socketConnect
};
