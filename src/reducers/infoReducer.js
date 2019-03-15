import {
  INFO_ABOUT_START,
  INFO_MASTER_ABOUT_START,
  INFO_MASTER_TO_ENTER_ASSOSIATION
} from '../actions/types';

const initialState = {
  startGameInfo: false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case INFO_ABOUT_START:                                                     // INFO_ABOUT_START

      return {
        ...state,
        startGameInfo: action.startGameInfo,
        message: action.message
      };
    // eslint-disable-next-line prettier/prettier
    case INFO_MASTER_ABOUT_START:                                       // INFO_MASTER_ABOUT_START

      return {
        ...state,
        startGameInfo: action.startGameInfo,
        message: action.message
      };
    // eslint-disable-next-line prettier/prettier
    case INFO_MASTER_TO_ENTER_ASSOSIATION:                       // INFO_MASTER_TO_ENTER_ASSOSIATION

      return {
        ...state,
        startGameInfo: action.startGameInfo,
        message: action.message
      };
    default:
      return state;
  }
};
