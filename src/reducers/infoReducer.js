import { INFO_ABOUT_START } from '../actions/types';

const initialState = {
  startGameInfo: false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case INFO_ABOUT_START:                                                     // INFO_ABOUT_START
      console.log('INFO_ABOUT_START', action);
      alert(action.message);
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};
