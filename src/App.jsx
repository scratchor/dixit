import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';
import Modal from './components/UI/Modal/Modal';
import Register from './components/Forms/Register/Register';
import Login from './components/Forms/Login/Login';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    showLogin: false,
    showRegister: false
  };

  openModal = name => {
    if (name === 'Register') {
      this.setState({
        showRegister: true
      });
    } else if (name === 'Login') {
      this.setState({
        showLogin: true
      });
    }
  };

  closeModal = () => {
    this.setState({
      showRegister: false,
      showLogin: false
    });
  };

  render() {
    const { showRegister, showLogin } = this.state;

    return (
      <AppContext.Provider value={this.openModal}>
        <Layout>
          <Switch>
            <Wrapper>
              <Modal
                show={showRegister || showLogin}
                modalClosed={this.closeModal}
              >
                {showLogin ? <Login /> : null}
                {showRegister ? <Register /> : null}
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
