import React from 'react';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';

const app = () => {
  return (
    <Layout>
      <Wrapper>Main section</Wrapper>
    </Layout>
  );
};

export default app;
