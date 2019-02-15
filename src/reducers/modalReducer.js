import { HIDE_MODAL, SHOW_MODAL } from '../actions/types';

const initialState = {
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: true, modalType: action.modalType };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
