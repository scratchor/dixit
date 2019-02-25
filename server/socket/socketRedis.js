const client = require('../databases/redis/client');
const roomArrays = require('./socket').roomArrays;

// const sendJoinRoomInfo =  (socket, room) => {
//   let avatar1;
//   let name1;
//  client.lrange(`avatar${room.split('')[4]}`, 0, -1, async (err, avatar) => {
//
//     const func = () => {
//     await  avatar1 = avatar;
//       console.log('sendJoinRoomInfo avatar');
//     };
//      func();
//     client.lrange(`username${room.split('')[4]}`, 0, -1,  (err, name) => {
//
//        const func = () => {
//          name1 = name;
//          console.log('sendJoinRoomInfo username');
//        };
//         func();
//     return socket.emit('value', {
//         type: 'ADD_PLAYER',
//         avatar: avatar1,
//         username: name1
//       });
//     });
//   });
// };

const sendJoinRoomInfo = (socket, room) =>
  new Promise(res => {
    // const send = (socket, room) => {

    // new Promise((res, rej) => {
    client.lrange(`avatar${room.split('')[4]}`, 0, -1, (err, avatar) => {
      console.log('sendJoinRoomInfo avatar');
      client.lrange(`username${room.split('')[4]}`, 0, -1, (err, username) => {
        console.log('sendJoinRoomInfo username');
        // eslint-disable-next-line prettier/prettier
        client.lrange(`socketsId${room.split('')[4]}`, 0, -1, (err, socketsId) => {
            console.log('sendJoinRoomInfo socketsId');
            socket.emit('action', {
              type: 'ADD_PLAYER_OLD_STATUS',
              avatar,
              username,
              socketsId
            });
            res();
          }
        );
      });
    });
  });
// });
// res()

// //}

const writeJoinRoomSocketInfo = (user, room, socket) => {
  client.rpush(`avatar${room.split('')[4]}`, `${user.avatar}`);
  client.rpush(`username${room.split('')[4]}`, `${user.name}`);
  client.rpush(`socketsId${room.split('')[4]}`, `${socket.id}`);
  console.log('writeJoinRoomSocketInfo');
  client.lrange(`avatar${room.split('')[4]}`, 0, -1, (err, value) => {
    console.log(value);
  });
  client.lrange(`username${room.split('')[4]}`, 0, -1, (err, value) => {
    console.log(value);
  });
};

const deleteFromDatabase = (socketRoom, user, socket, roomArrays) => {
  console.log('Disconnecting - deleting the socket from the database!');

  new Promise(res => {
    // eslint-disable-next-line prettier/prettier
    client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
        res(value);
      }
    );
  })
    .then(value => {
      const i = value.indexOf(socket.id);
      return i;
    })
    .then(i => {
      console.log(i);
      roomArrays.forEach(e => {
        client.lset(e, i, 'delete', () => {
          client.lrem(e, 1, 'delete', () => {
            if (e === 'socketsId1') {
              // eslint-disable-next-line prettier/prettier
              client.lrange(`avatar${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
                  console.log(value);
                }
              );

              // eslint-disable-next-line prettier/prettier
              client.lrange(`username${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
                  console.log(value);
                }
              );

              // eslint-disable-next-line prettier/prettier
              client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
                  console.log(value);
                }
              );
            }
          });
        });
      });
    })
    .catch(err => console.log(err));
};

module.exports = {
  sendJoinRoomInfo,
  writeJoinRoomSocketInfo,
  deleteFromDatabase
};
