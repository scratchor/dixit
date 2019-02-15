import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from './LayoutStyled';
import Header from '../components/Navigation/Header/Header';

class Layout extends Component {
  componentDidMount() {
    console.log(`[Layout] componentDidMount()`);
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <GlobalStyle />
        <Header />
        <div>{children}</div>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
