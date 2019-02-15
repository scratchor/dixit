import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './InfoInputFieldStyled';

const infoInputField = ({ props }) => {
  infoInputField.defaultProps = {
    master: null
  };
  const { master } = props;
  const Elem = master ? (
    <input placeholder="Enter your association!" />
  ) : (
    <p>Association</p>
  );
  return <Wrapper>{Elem}</Wrapper>;
};

infoInputField.propTypes = {
  props: PropTypes.shape({
    master: PropTypes.bool.isRequired
  }).isRequired,
  master: PropTypes.bool
};

export default infoInputField;
