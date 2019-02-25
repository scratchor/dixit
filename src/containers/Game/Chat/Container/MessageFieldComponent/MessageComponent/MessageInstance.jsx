import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './MessageInstanceStyled';

const MessageInstance = props => {
  return <Wrapper>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    was popularised in the 1960s with the release of Letraset sheets containing.
  </Wrapper>;
};

MessageInstance.propTypes = {};

export default MessageInstance;
