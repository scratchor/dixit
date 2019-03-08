import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wrapper from './GameWindowStyled';
import Association from './Container/Association';
import ExposedCards from './Container/ExposedCards';
import PlayerCards from './Container/PlayerCards';

class GameWindow extends Component {
  shouldComponentUpdate(nextProps) {
    console.log('shouldComponentUpdate GameWindow');
    console.log(nextProps);
    const cardsNew = nextProps.cards;
    const { playersNumber, email, master } = nextProps;
    const { masterCard, guessedCards } = cardsNew;
    if (masterCard && guessedCards.length === playersNumber - 1) {
      this.finishedRound(masterCard, guessedCards, email, master);
    }
    const { props } = this;
    const cardsPrev = props.cards;
    const playerCardsBool = !cardsNew.playerCards.every((e, i) => {
      return e === cardsPrev.playerCards[i];
    });
    const ExposedCardsBool = !cardsNew.exposedCards.every((e, i) => {
      return e === cardsPrev.exposedCards[i];
    });
    return playerCardsBool || ExposedCardsBool || false;
  }

  finishedRound = (masterCard, guessedCards, email, master) => {
    console.log('finishedRound');
    const some = guessedCards.some(e => e === masterCard);
    const every = guessedCards.every(e => e === masterCard);
    if (every) {
      this.request({
        email,
        score: `${master ? 0 : 3}`
      });
    } else if (some) {
      this.request({
        email,
        score: '5'
      });
    } else {
      this.request({
        email,
        score: `${master ? 0 : 3}`
      });
    }
  };

  request = data => {
    axios
      .put('http://localhost:5000/api/users/score', data)
      .catch(err => console.log(err));
  };

  render() {
    const { cards } = this.props;
    const { playerCards, exposedCards } = cards;
    console.log(playerCards);
    return (
      <Wrapper>
        <Association />
        <ExposedCards props={exposedCards} />
        <PlayerCards props={playerCards} />
      </Wrapper>
    );
  }
}

GameWindow.defaultProps = {
  cards: {
    playerCards: [],
    exposedCards: []
  },
  master: false,
  email: null
};

GameWindow.propTypes = {
  cards: PropTypes.shape({}),
  playersNumber: PropTypes.number.isRequired,
  masterMadeStep: PropTypes.bool.isRequired,
  master: PropTypes.bool,
  email: PropTypes.string
};

const mapStateToProps = state => {
  return {
    cards: state.dealCardsReducer.cards,
    email: state.userInfoReducer.user.email,
    playersNumber: state.ratingReducer.players.playersNumber,
    master: state.ratingReducer.players.master,
    masterMadeStep: state.ratingReducer.players.masterMadeStep
  };
};

export default connect(mapStateToProps)(GameWindow);
