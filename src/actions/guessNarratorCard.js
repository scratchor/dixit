import { GUESS_NARRATOR_CARD } from './types';

export default (src, master, socketId) => {
  if (master) {
    return {
      type: GUESS_NARRATOR_CARD,
      meta: { remote: true },
      master: true,
      src
    };
  }
  return {
    type: GUESS_NARRATOR_CARD,
    meta: { remote: true },
    master: false,
    src,
    socketId
  };
};
