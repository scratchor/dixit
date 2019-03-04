import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './MessageInstanceStyled';

const MessageInstance = ({ message }) => {
  return <Wrapper>{message}</Wrapper>;
};

MessageInstance.propTypes = {};

export default MessageInstance;
