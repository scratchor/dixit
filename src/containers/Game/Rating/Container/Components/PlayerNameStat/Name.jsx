import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './NameStyled';

const name = ({ name }) => {
  return <Wrapper>{name}</Wrapper>;
};

name.propTypes = {
  name: PropTypes.string.isRequired
};

export default name;
