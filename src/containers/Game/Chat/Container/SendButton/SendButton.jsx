import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './SendButtonStyled';

const sendButton = ({ click }) => {
  return <Wrapper onClick={click}>send</Wrapper>;
};

sendButton.propTypes = {
  click: PropTypes.func.isRequired
};

sendButton.propTypes = {};

export default sendButton;
