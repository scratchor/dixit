import React, { Component } from 'react';
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

export default GameWindow;
