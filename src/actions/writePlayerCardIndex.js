import { WRITE_PLAYER_CARD_INDEX } from './types';

export default i => {
  return {
    type: WRITE_PLAYER_CARD_INDEX,
    i
  };
};
