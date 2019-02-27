import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './InfoInputFieldStyled';

const infoInputField = ({ props }) => {
  infoInputField.defaultProps = {
    master: null,
    masterMadeStep: null,
    association: 'Association'
  };
  const { master, masterMadeStep, association } = props;
  const Elem =
    master && !masterMadeStep ? (
      <input id="association" placeholder="Enter your association!" />
    ) : (
      <p>{association || 'Association'}</p>
    );
  return <Wrapper>{Elem}</Wrapper>;
};

infoInputField.propTypes = {
  props: PropTypes.shape({
    master: PropTypes.bool.isRequired
  }).isRequired,
  master: PropTypes.bool,
  masterMadeStep: PropTypes.bool,
  association: PropTypes.string
};

export default infoInputField;
