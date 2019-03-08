import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './GameWindowStyled';
import Association from './Container/Association';
import ExposedCards from './Container/ExposedCards';
import PlayerCards from './Container/PlayerCards';

class GameWindow extends Component {
  shouldComponentUpdate(nextProps) {
    const cardsNew = nextProps.cards;
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
  cards: { playerCards: [], exposedCards: [] }
};

GameWindow.propTypes = {
  cards: PropTypes.shape({})
};

const mapStateToProps = state => {
  return {
    cards: state.dealCardsReducer.cards
  };
};

export default connect(mapStateToProps)(GameWindow);
