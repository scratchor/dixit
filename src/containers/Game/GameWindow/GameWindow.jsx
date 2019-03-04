import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from './GameWindowStyled';
import Association from './Container/Association';
import ExposedCards from './Container/ExposedCards';
import PlayerCards from './Container/PlayerCards';

class GameWindow extends Component {
  render() {
    return (
      <Wrapper>
        <Association />
        <ExposedCards />
        <PlayerCards />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.dealCardsReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: id => dispatch({ type: 'DELETE_POST', id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWindow);
