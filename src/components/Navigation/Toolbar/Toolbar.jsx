import React from 'react';

import Wrapper from './ToolbarStyled';

const toolbar = () => {
  return (
    <Wrapper>
      <div style={{ marginLeft: '10px' }}>Logo</div>
      <div style={{ marginLeft: '10px' }}>Navigation</div>
    </Wrapper>
  );
};

export default toolbar;
