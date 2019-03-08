import {
  HANG_OUT_THE_CARDS,
  WRITE_PLAYER_CARD_INDEX,
  TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS
} from '../actions/types';

const initialState = {
  cards: {
    playerCards: [],
    exposedCards: [],
    playerCardIndex: undefined
  }
};

export default (state = initialState, action) => {
  let cards;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case HANG_OUT_THE_CARDS:                                                   // HANG_OUT_THE_CARDS
      cards = {
        ...state.cards,
        playerCards: [...state.cards.playerCards, ...action.playerCards],
        exposedCards: [...state.cards.exposedCards]
      };
      return {
        ...state,
        cards
      };
    // eslint-disable-next-line prettier/prettier
    case WRITE_PLAYER_CARD_INDEX:                                        // WRITE_PLAYER_CARD_INDEX
      cards = {
        ...state.cards,
        playerCardIndex: action.i
      };
      return {
        ...state,
        cards
      };
    // eslint-disable-next-line prettier/prettier
    case TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS:               // TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS
      cards = {
        ...state.cards,
        exposedCards: [...state.cards.exposedCards, action.src]
      };
      return {
        ...state,
        cards
      };
    default:
      return state;
  }
};
