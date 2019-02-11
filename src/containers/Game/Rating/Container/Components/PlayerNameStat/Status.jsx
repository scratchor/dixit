import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './StatusStyled';

const status = ({ status }) => {
  return <Wrapper>{status}</Wrapper>;
};

status.propTypes = {
  status: PropTypes.string.isRequired
};

export default status;
