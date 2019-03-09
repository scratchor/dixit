import {
  HANG_OUT_THE_CARDS,
  WRITE_PLAYER_CARD_INDEX,
  TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS,
  GUESS_NARRATOR_CARD,
  ADD_ONE_CARD
} from '../actions/types';

const initialState = {
  cards: {
    playerCards: [],
    exposedCards: [],
    guessedCards: [],
    guessedCardsSocketsId: [],
    playerCardIndex: undefined,
    masterCard: undefined
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
    // eslint-disable-next-line prettier/prettier
    case GUESS_NARRATOR_CARD:                                           // GUESS_NARRATOR_CARD

      if (action.master) {
        cards = {
          ...state.cards,
          masterCard: action.src
        };
      } else {
        const i = state.cards.guessedCardsSocketsId.indexOf(action.socketId);
        if (i === -1) {
          cards = {
            ...state.cards,
            guessedCards: [...state.cards.guessedCards, action.src],
            guessedCardsSocketsId: [
              ...state.cards.guessedCardsSocketsId,
              action.socketId
            ]
          };
        } else {
          const newArr = state.cards.guessedCards;
          newArr.splice(i, 1, `${action.src}`);
          cards = {
            ...state.cards,
            guessedCards: newArr
          };
        }
      }
      return {
        ...state,
        cards
      };
    // eslint-disable-next-line prettier/prettier
    case ADD_ONE_CARD:                                                  // ADD_ONE_CARD
      console.log('ADD_ONE_CARD', action.src);
      const playerCards = state.cards.playerCards.slice();
      const i = state.cards.playerCardIndex;
      console.log(playerCards);
      playerCards.splice(i, 1, action.src);
      console.log(playerCards);
      cards = {
        ...state.cards,
        playerCards
      };
      return {
        ...state,
        cards
      };
    default:
      return state;
  }
};
