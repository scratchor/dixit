import { ADD_ONE_CARD_ACTION } from './types';

export default isMasterOut => {
  return {
    type: ADD_ONE_CARD_ACTION,
    meta: { remote: true },
    isMasterOut
  };
};
