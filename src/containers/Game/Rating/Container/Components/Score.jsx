import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './ScoreStyled';

const score = ({ score }) => {
  return <Wrapper>{score}</Wrapper>;
};

score.propTypes = {
  score: PropTypes.string.isRequired
};
export default score;
