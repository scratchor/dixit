import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './ButtonStyled';

const button = ({ clicked, name }) => {
  return <Wrapper onClick={clicked}>{name}</Wrapper>;
};

button.propTypes = {
  name: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default button;
