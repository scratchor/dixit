import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from './LayoutStyled';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  componentDidMount() {
    console.log(`[Layout] componentDidMount()`);
  }

  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <Toolbar />
        <div>{children}</div>
        <div style={{ marginLeft: '10px' }}>Footer</div>
      </Wrapper>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
