import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './InputStyled';

const input = props => {
  return (
    <Wrapper>
      <textarea rows="2" placeholder="Type your message" />
    </Wrapper>
  );
};

input.propTypes = {};

export default input;
