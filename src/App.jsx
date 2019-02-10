import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';
import Modal from './components/UI/Modal/Modal';
import Register from './components/Forms/Register/Register';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    show: false
  };

  openSignInWindow = name => {
    if (name === 'Register') {
      this.setState({
        show: true
      });
    }
  };

  closeSignInWindow = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const { show } = this.state;
    return (
      <AppContext.Provider value={this.openSignInWindow}>
        <Layout>
          <Switch>
            <Wrapper>
              <Modal show={show} modalClosed={this.closeSignInWindow}>
                <Register />
              </Modal>
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
