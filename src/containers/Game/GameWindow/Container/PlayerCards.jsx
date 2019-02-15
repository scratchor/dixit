import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './PlayerCardsStyled';
import PlayerCard from './PlayerCards/PlayerCard';

const playerCards = props => {
  return (
    <Wrapper>
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
    </Wrapper>
  );
};

playerCards.propTypes = {};

export default playerCards;
