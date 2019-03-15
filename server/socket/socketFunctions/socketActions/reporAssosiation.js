const client = require('../../../databases/redis/client');

module.exports = (io, action, socketRoom) => {
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
};
