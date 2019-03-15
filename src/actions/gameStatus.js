import { CHANGE_GAME_STATUS } from './types';

export const changeGameStatus = status => {
  return {
    type: CHANGE_GAME_STATUS,
    status
  };
};


