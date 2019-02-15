import { HIDE_MODAL, SHOW_MODAL } from './types';

export const showModal = modalType => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    modalType
  });
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};
