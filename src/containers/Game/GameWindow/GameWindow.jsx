import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wrapper from './GameWindowStyled';
import Association from './Container/Association';
import ExposedCards from './Container/ExposedCards';
import PlayerCards from './Container/PlayerCards';
import addScoreHighliter from '../../../actions/addScoreHighliter';
import addOneCard from '../../../actions/addOneCard';
import finishedRound from '../../../actions/finishedRound';

class GameWindow extends Component {
  shouldComponentUpdate(nextProps) {
    const cardsNew = nextProps.cards;
    const {
      playersNumber,
      finishedRound,
      email,
      master,
      socketId,
      addOneCard,
      MakeFinishedRound,
      isMasterOut
    } = nextProps;
    const { masterCard, guessedCards } = cardsNew;
    if (
      !finishedRound &&
      masterCard &&
      guessedCards.length === playersNumber - 1
    ) {
      MakeFinishedRound();
      this.animateDelitionExposedCards();
      this.finishedRound(masterCard, guessedCards, email, master, socketId);
      if (master) {
        addOneCard(isMasterOut);
      }
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

  animateDelitionExposedCards = () => {
    let exposedCards = document.querySelectorAll('.exposedCard');
    exposedCards = [].slice.call(exposedCards);
    exposedCards.forEach(e => {
      console.dir(e);
      e.children[1].classList.add('deleteExposedAnim');
    });
  };

  finishedRound = (masterCard, guessedCards, email, master, socketId) => {
    const { addScoreHighliter } = this.props;
    console.log('finishedRound');
    const some = guessedCards.some(e => e === masterCard);
    const every = guessedCards.every(e => e === masterCard);
    if (every) {
      const score = `${master ? 0 : 3}`;
      this.request({
        email,
        score
      });
      addScoreHighliter(socketId, score);
    } else if (some) {
      this.request({
        email,
        score: '5'
      });
      addScoreHighliter(socketId, 5);
    } else {
      const score = `${master ? 0 : 3}`;
      this.request({
        email,
        score
      });
      addScoreHighliter(socketId, score);
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
  email: null,
  socketId: null
};

GameWindow.propTypes = {
  cards: PropTypes.shape({}),
  playersNumber: PropTypes.number.isRequired,
  finishedRound: PropTypes.bool.isRequired,
  master: PropTypes.bool,
  email: PropTypes.string,
  socketId: PropTypes.string,
  addScoreHighliter: PropTypes.func.isRequired,
  addOneCard: PropTypes.func.isRequired,
  MakeFinishedRound: PropTypes.func.isRequired,
  isMasterOut: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    cards: state.dealCardsReducer.cards,
    email: state.userInfoReducer.user.email,
    socketId: state.userInfoReducer.user.socketId,
    playersNumber: state.ratingReducer.players.playersNumber,
    finishedRound: state.ratingReducer.players.finishedRound,
    master: state.ratingReducer.players.master,
    masterMadeStep: state.ratingReducer.players.masterMadeStep,
    isMasterOut: state.ratingReducer.players.isMasterOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addScoreHighliter: (socketId, addScore) =>
      dispatch(addScoreHighliter(socketId, addScore)),
    addOneCard: isMasterOut => dispatch(addOneCard(isMasterOut)),
    MakeFinishedRound: () => dispatch(finishedRound())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWindow);
