import { USER_INFO } from '../actions/types';

const initialState = {
  user: {
    socketId: undefined,
    avatar: '',
    username: undefined,
    email: undefined
  }
};

export default function(state = initialState, action) {
  let user;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case USER_INFO:                                                               //  USER_INFO
      user = {
        socketId: action.socketId,
        avatar: action.avatar,
        username: action.username,
        email: action.email
      };
      return {
        ...state,
        user
      };
    default:
      return state;
  }
}
