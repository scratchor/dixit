import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './FotoStyled';

const foto = ({ foto }) => {
  return <Wrapper style={{ backgroundImage: `url(${foto})` }} />;
};

foto.propTypes = {};

export default foto;
