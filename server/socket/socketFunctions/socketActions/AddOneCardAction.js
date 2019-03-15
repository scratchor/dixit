const client = require('../../../databases/redis/client');

module.exports = (io, socketRoom, action, cards, roomArraysDelete) => {
  return new Promise(resolve => {
    console.log('isMasterOut', action.isMasterOut);
    if (cards.length > 0) {
      // eslint-disable-next-line prettier/prettier
  client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, socketsId) => {
          socketsId.forEach(e => {
            const src = cards.shift();
            console.log('ADD_ONE_CARD', e, src);
            io.to(e).emit('action', {
              type: 'ADD_ONE_CARD',
              src
            });
          });
          resolve(cards);
        }
      );
      console.log(cards);
    }
    setTimeout(() => {
      io.in(socketRoom).emit('action', {
        type: 'DELETE_EXPOSED_CARDS'
      });
    }, 2000);
    setTimeout(() => {
      io.in(socketRoom).emit('action', {
        type: 'START_NEXT_ROUND'
      });
    }, 8000);
    setTimeout(() => {
      if (!action.isMasterOut) {
        roomArraysDelete.forEach(e => {
          client.lpop(e, (err, player) => {
            client.rpush(e, player);
          });
        });
        // eslint-disable-next-line prettier/prettier
    client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, socketsId) => {
            io.to(socketsId[0]).emit('action', {
              type: 'MAKE_MASTER',
              master: true
            });
          }
        );
      } else {
        // eslint-disable-next-line prettier/prettier
    client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, socketsId) => {
            io.to(socketsId[0]).emit('action', {
              type: 'MAKE_MASTER',
              master: true
            });
          }
        );
      }
    }, 10000);
  });
};
