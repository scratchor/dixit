import { HANG_OUT_THE_CARDS } from '../actions/types';

const initialState = {
  cards: {
    playerCards: [],
    exposedCards: []
  }
};

export default (state = initialState, action) => {
  let cards;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case HANG_OUT_THE_CARDS:                                                     // HANG_OUT_THE_CARDS
      cards = {
        playerCards: [...state.cards.playerCards, ...action.playerCards],
        exposedCards: [...state.cards.exposedCards]
      };
      return {
        ...state,
        cards
      };
    default:
      return state;
  }
};
