const client = require('../../../databases/redis/client');

module.exports = (socketRoom, action, socket) => {
  client.rpush(`chatMessages${socketRoom.split('')[4]}`, `${action.message}`);
  client.rpush(`chatAvatars${socketRoom.split('')[4]}`, `${action.avatar}`);
  client.rpush(`chatUserNames${socketRoom.split('')[4]}`, `${action.username}`);
  client.rpush(`chatSocketsId${socketRoom.split('')[4]}`, `${action.socketId}`);
  client.rpush(`chatDates${socketRoom[0].split('')[4]}`, `${action.date}`);
  client.llen(`chatMessages${socketRoom.split('')[4]}`, (err, value) => {
    if (value > 30) {
      client.ltrim(`chatMessages${socketRoom.split('')[4]}`, 1, 30);
      client.ltrim(`chatAvatars${socketRoom.split('')[4]}`, 1, 30);
      client.ltrim(`chatUserNames${socketRoom.split('')[4]}`, 1, 30);
      client.ltrim(`chatSocketsId${socketRoom.split('')[4]}`, 1, 30);
      client.ltrim(`chatDates${socketRoom.split('')[4]}`, 1, 30);
    }
  });
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
};
