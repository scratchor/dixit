import React, { Component } from 'react';

import Wrapper from './NavigationItemsStyled';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
  signInHandler = () => {
    console.log();
  };

  signUpHandler = () => {
    console.log();
  };

  render() {
    return (
      <Wrapper>
        <NavigationItem path="/" name="Home" />
        <NavigationItem path="/rules" name="Game rules" />
        <NavigationItem path="/stats" name="Stats" />
        {/* Delete before merging */}
        <NavigationItem path="/games" name="Game" />
        <button
          style={{ marginRight: '40px' }}
          type="button"
          onClick={this.signInHandler}
        >
          Sign In
        </button>
        <button
          style={{ marginRight: '40px' }}
          type="button"
          onClick={this.signUpHandler}
        >
          Sign Up
        </button>
      </Wrapper>
    );
  }
}

export default NavigationItems;
