import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from './BackdropStyled';

const backdrop = ({ show, clicked }) =>
  show ? <Backdrop onClick={clicked} /> : null;

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};

export default backdrop;
