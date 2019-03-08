import { TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS } from './types';

export default src => {
  return {
    type: TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS,
    meta: { remote: true },
    src
  };
};
