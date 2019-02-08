import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';
import Modal from './components/UI/Modal/Modal';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    show: false
  };

  clickHandler = name => {
    if (name === 'Sign In') {
      this.setState(prevState => ({
        show: !prevState.show
      }));
    }
  };

  render() {
    const { show } = this.state;
    let modal = null;
    if (show) {
      modal = <Modal />;
    }
    return (
      <AppContext.Provider value={this.clickHandler}>
        <Layout>
          <Switch>
            <Wrapper>
              {modal}
              <Route path="/" exact component={StartPage} />
              <Route path="/rules" exact component={Rules} />
              <Route path="/stats" exact component={Stats} />
            </Wrapper>
          </Switch>
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default App;
