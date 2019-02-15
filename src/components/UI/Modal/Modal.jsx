import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './ModalStyled';
import Backdrop from '../Backdrop/Backdrop';

const modal = ({ show, modalClosed, children }) => {
  modal.defaultProps = {
    children: null
  };

  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <Wrapper show={show}>{children}</Wrapper>
    </>
  );
};

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default modal;
