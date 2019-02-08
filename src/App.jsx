import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';

const app = () => {
  return (
    <Layout>
      <Switch>
        <Wrapper>
          <Route path="/" exact component={StartPage} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/stats" exact component={Stats} />
        </Wrapper>
      </Switch>
    </Layout>
  );
};

export default app;
