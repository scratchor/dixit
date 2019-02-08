import React from 'react';

import Wrapper from './HeaderStyled';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => {
  return (
    <Wrapper>
      <div style={{ marginLeft: '10px' }}>Logo</div>
      <NavigationItems />
    </Wrapper>
  );
};

export default toolbar;
