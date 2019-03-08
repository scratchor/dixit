import { CHANGE_GAME_STATUS } from '../actions/types';

const initialState = {
  gameStatus: 'Waiting till minimum three players join the game...'
};

export default (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case CHANGE_GAME_STATUS:                                                     // CHANGE_GAME_STATUS
      const { status } = action;
      return {
        ...state,
        gameStatus: status
      };
    default:
      return state;
  }
};
