import { CHANGE_GAME_STATUS } from './types';

export const changeGameStatus = status => {
  return {
    type: CHANGE_GAME_STATUS,
    status
  };
};

// export const changeGameStatusWithSocket = status => {
//   return {
//     type: CHANGE_GAME_STATUS,
//     meta: { remote: true },
//     status
//   };
// };
