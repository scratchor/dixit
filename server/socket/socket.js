const jwtAuth = require('socketio-jwt-auth');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const User = require('../databases/mongo/models/User');
const client = require('../databases/redis/client');

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
        console.log('Authentication Failed!!!');
        return done(); // in your connection handler user.logged_in will be false
      }
    }
  );
};

const rooms = ['game1'];
const roomArrays = [
  `avatar${rooms[0].split('')[4]}`,
  `username${rooms[0].split('')[4]}`,
  `socketsId${rooms[0].split('')[4]}`
];

client.del('avatar1');
client.del('username1');
client.del('socketsId1');

const socketConnect = io => {
  io.on('connection', socket => {
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    let { user } = socket.request;
    let socketRoom;

    socket.on('joinRoom', async room => {
      if (rooms.includes(room)) {
        socket.join(room, () => {
          const rooms = Object.keys(socket.rooms);
          console.log(rooms);
        });
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
                return socket.emit('joinRoom', { isAuthenticated: true });
              });
            });
          }
          break;
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
        io.in(socketRoom).emit('action', {
          type: 'DELETE_PLAYER',
          socketId: socket.id
        });
        deleteFromDatabase(socketRoom, user, socket, roomArrays);
      }
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
};

module.exports = {
  jwtAuthSocket,
  socketConnect
};
