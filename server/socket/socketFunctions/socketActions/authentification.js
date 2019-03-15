const jwt = require('jsonwebtoken');
const secret = require('../../../config/keys').secretOrKey;
const User = require('../../../databases/mongo/models/User');

module.exports = (socket, action) => {
  let user;
  const { token } = action;
  if (token) {
    return jwt.verify(token, secret, (err, payload) => {
      // if (err.name === 'TokenExpiredError') {
      //   console.log('socket expired');
      //   return socket.emit('action', {
      //     type: 'SOCKET_ERROR',
      //     message: 'socket expired'
      //   });
      // }
      return User.findById(payload.id).then(data => {
        if (!data) {
          socket.emit('error', {
            message: 'Game authentication: user not exist'
          });
        }
        user = data;
        user.logged_in = true;
        // console.log(data);
        // console.log(socket.id);
        socket.emit('action', {
          type: 'USER_INFO',
          avatar: data.avatar,
          username: data.name,
          socketId: socket.id,
          email: data.email
        });
        return user;
      });
    });
  }
};
