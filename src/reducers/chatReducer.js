import { CHAT_MESSAGE, CHAT_ROOM_INFO } from '../actions/types';

const initialState = {
  chat: {
    messages: [],
    fotos: [],
    usernames: [],
    socketId: [],
    date: []
  }
};

export default (state = initialState, action) => {
  let chat;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case CHAT_MESSAGE:                                                     // CHAT_MESSAGE
      chat = {
        messages: [...state.chat.messages, action.message],
        fotos: [...state.chat.fotos, action.avatar],
        usernames: [...state.chat.usernames, action.username],
        socketId: [...state.chat.socketId, action.socketId],
        date: [...state.chat.date, action.date]
      };
      return {
        ...state,
        chat
      };
    // eslint-disable-next-line prettier/prettier
    case CHAT_ROOM_INFO:                                                     // CHAT_ROOM_INFO
      chat = {
        messages: [...state.chat.messages, ...action.chatMessages],
        fotos: [...state.chat.fotos, ...action.chatAvatars],
        usernames: [...state.chat.usernames, ...action.chatUserNames],
        socketId: [...state.chat.socketId, ...action.chatSocketsId],
        date: [...state.chat.date, ...action.chatDates]
      };
      return {
        ...state,
        chat
      };
    default:
      return state;
  }
};
