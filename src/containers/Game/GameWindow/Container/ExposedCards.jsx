import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './ExposedCardsStyled';
import Card from './ExposedCardsComponents/Card';

const exposedCards = props => {
  return (
    <Wrapper>
      <div className="cardsField">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Wrapper>
  );
};

exposedCards.propTypes = {};

export default exposedCards;
