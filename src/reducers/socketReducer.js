import { SOCKET_ERROR } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SOCKET_ERROR:
      console.log(action.message);
      return {
        ...state
      };
    default:
      return state;
  }
}
