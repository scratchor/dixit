import React, { Component } from 'react';
import Wrapper from './RatingStyled';

import PlayerInfo from './Container/PlayerInfo';
import StartButton from './Container/StartButton';

class Rating extends Component {
  render() {
    return (
      <Wrapper>
        <StartButton />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
        <PlayerInfo />
      </Wrapper>
    );
  }
}

export default Rating;
