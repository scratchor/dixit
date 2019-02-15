import { REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST } from './types';

export const successRegister = () => dispatch => {
  dispatch({
    type: REGISTER_SUCCESS
  });
};

export const failedRegister = () => {
  return {
    type: REGISTER_FAILED
  };
};

export const requestRegister = () => {
  return {
    type: REGISTER_REQUEST
  };
};
