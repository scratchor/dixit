const { permission } = require('../config/permission');
let playersNumber = require('./socket').playersNumber;

console.log(playersNumber);

// const joinRoom = async () => {
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
//     console.log(`New player has joined to the room ${room} with id`, socket.id);
//   } else {
//     socket.emit('error', 'Error, no room with such name existed');
//     socket.disconnect();
//   }
// };
