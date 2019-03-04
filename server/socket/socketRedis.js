const client = require('../databases/redis/client');
// let { permission } = require('../config/permission');

const sendJoinRoomInfo = (socket, room) =>
  new Promise(res => {
    client.lrange(`avatar${room.split('')[4]}`, 0, -1, (err, avatar) => {
      console.log('sendJoinRoomInfo avatar');
      client.lrange(`username${room.split('')[4]}`, 0, -1, (err, username) => {
        console.log('sendJoinRoomInfo username');
        // eslint-disable-next-line prettier/prettier
        client.lrange(`socketsId${room.split('')[4]}`, 0, -1, (err, socketsId) => {
            console.log('sendJoinRoomInfo socketsId');
            // eslint-disable-next-line prettier/prettier
          client.get(`playersNumber${room.split('')[4]}`, (err, playersNumber) => {
                console.log('sendJoinRoomInfo playersNumber', playersNumber);
                if (playersNumber === '0') {
                  socket.emit('action', {
                    type: 'MAKE_MASTER',
                    master: true
                  });
                }
                socket.emit('action', {
                  type: 'ADD_PLAYER_OLD_STATUS',
                  avatar,
                  username,
                  socketsId
                });
                res();
              }
            );
          }
        );
      });
    });
  });

const sendChatRoomInfo = (socket, room) =>
  new Promise(res => {
    // eslint-disable-next-line prettier/prettier
    client.lrange(`chatMessages${room.split('')[4]}`, 0, -1, (err, chatMessages) => {
        console.log('sendChatRoomInfo', chatMessages);
        // eslint-disable-next-line prettier/prettier
      client.lrange(`chatAvatars${room.split('')[4]}`, 0, -1, (err, chatAvatars) => {
            console.log('sendChatRoomInfo', chatAvatars);
            // eslint-disable-next-line prettier/prettier
        client.lrange(`chatUserNames${room.split('')[4]}`, 0, -1, (err, chatUserNames) => {
                console.log('sendChatRoomInfo', chatUserNames);
                // eslint-disable-next-line prettier/prettier
          client.lrange(`chatSocketsId${room.split('')[4]}`, 0, -1, (err, chatSocketsId) => {
                    console.log('sendChatRoomInfo', chatSocketsId);
                    // eslint-disable-next-line prettier/prettier
              client.lrange(`chatDates${room.split('')[4]}`, 0, -1, (err, chatDates) => {
                        console.log('sendChatRoomInfo', chatDates);
                        socket.emit('action', {
                          type: 'CHAT_ROOM_INFO',
                          chatMessages,
                          chatAvatars,
                          chatUserNames,
                          chatSocketsId,
                          chatDates
                        });
                        res();
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });

const writeJoinRoomSocketInfo = (user, room, socket) => {
  client.rpush(`avatar${room.split('')[4]}`, `${user.avatar}`);
  client.rpush(`username${room.split('')[4]}`, `${user.name}`);
  client.rpush(`socketsId${room.split('')[4]}`, `${socket.id}`);
  client.get(`playersNumber${room.split('')[4]}`, (err, playersNumber) => {
    console.log(playersNumber);
    const newPlayersNumber = +playersNumber + 1;
    client.set(`playersNumber${room.split('')[4]}`, newPlayersNumber);
  });
  console.log('writeJoinRoomSocketInfo');
  client.lrange(`avatar${room.split('')[4]}`, 0, -1, (err, value) => {
    console.log(value);
  });
  client.lrange(`username${room.split('')[4]}`, 0, -1, (err, value) => {
    console.log(value);
  });
};

const deleteFromDatabase = (socketRoom, socket, roomArrays, io) => {
  permission = false;
  console.log('deleteFromDatabase', permission);
  console.log('Disconnecting - deleting the socket from the game database!');

  new Promise(res => {
    // eslint-disable-next-line prettier/prettier
      client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
        res(value);
      }
    );
  })
    .then(value => {
      const i = value.indexOf(socket.id);
      if (i === 0 && value[1]) {
        io.to(`${value[1]}`).emit('action', {
          type: 'MAKE_MASTER',
          master: true
        });
      }
      return i;
    })
    .then(i => {
      console.log(i);
      client.get(
        `playersNumber${socketRoom.split('')[4]}`,
        (err, playersNumber) => {
          const newPlayersNumber = +playersNumber - 1;
          client.set(
            `playersNumber${socketRoom.split('')[4]}`,
            newPlayersNumber
          );
        }
      );
      roomArrays.forEach(e => {
        client.lset(e, i, 'delete', () => {
          client.lrem(e, 1, 'delete', () => {
            // console.log after the last list

            if (e === 'socketsId1') {
              permission = true;
              console.log(permission);
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
              // eslint-disable-next-line prettier/prettier
                client.get(`playersNumber${socketRoom.split('')[4]}`, (err, value) => {
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
  sendChatRoomInfo,
  writeJoinRoomSocketInfo,
  deleteFromDatabase
};
