import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './CardStyled';
import foto from '../../../Chat/Container/MessageFieldComponent/MessageComponent/Foto';

const card = props => {
  const url = 'https://www.dropbox.com/s/n6dgsyjkhjlyoch/7.jpg?raw=1';
  return <Wrapper src={url} />;
};
card.propTypes = {};

export default card;
