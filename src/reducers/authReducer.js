import isEmpty from '../validation/isEmpty';

import { SET_CURRENT_USER, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isSuccessRegister: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isSuccessRegister: true
      };
    default:
      return state;
  }
}
