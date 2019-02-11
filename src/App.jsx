import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';
// Delete before merging
import Games from './containers/Game/Game';

const app = () => {
  return (
    <Layout>
      <Switch>
        <Wrapper>
          <Route path="/" exact component={StartPage} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/stats" exact component={Stats} />
          {/* Delete before merging */}
          <Route path="/games" exact component={Games} />
        </Wrapper>
      </Switch>
    </Layout>
  );
};

export default app;
