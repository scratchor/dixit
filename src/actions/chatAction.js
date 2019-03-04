import { CHAT_MESSAGE } from './types';

export default (message, avatar, username, socketId, date) => {
  return {
    type: CHAT_MESSAGE,
    meta: { remote: true },
    message,
    avatar,
    username,
    socketId,
    date
  };
};
