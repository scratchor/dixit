import { ADD_SCORE_HIGHLITER } from './types';

export default (socketId, addScore) => {
  return {
    type: ADD_SCORE_HIGHLITER,
    meta: { remote: true },
    socketId,
    addScore
  };
};
