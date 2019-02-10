import React from 'react';

import Wrapper from './NavigationItemsStyled';
import NavigationItem from './NavigationItem/NavigationItem';

import Button from '../../UI/Button/Button';

const navigationItems = () => (
  <Wrapper>
    <NavigationItem path="/" name="Home" />
    <NavigationItem path="/rules" name="Game rules" />
    <NavigationItem path="/stats" name="Stats" />
    <Button name="Login" />
    <Button name="Register" />
  </Wrapper>
);

export default navigationItems;
