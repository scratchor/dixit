import React, { Component } from 'react';
import Wrapper from './GameStyled';
import Rating from './Rating/Rating';
import GameWindow from './GameWindow/GameWindow';
import Chat from './Chat/Chat';

class Game extends Component {
  render() {
    return (
      <Wrapper>
        <Rating />
        <GameWindow />
        <Chat />
      </Wrapper>
    );
  }
}

export default Game;
