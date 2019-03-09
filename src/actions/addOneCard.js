import { ADD_ONE_CARD_ACTION } from './types';

export default () => {
  return {
    type: ADD_ONE_CARD_ACTION,
    meta: { remote: true }
  };
};
