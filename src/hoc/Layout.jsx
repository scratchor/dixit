import React from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from './LayoutStyled';
import Header from '../components/Navigation/Header/Header';

const layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div>{children}</div>
    </>
  );
};

layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default layout;
