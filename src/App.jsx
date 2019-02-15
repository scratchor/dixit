import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import * as ModalActions from './actions/modalActions';
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import Wrapper from './AppStyled';
import Layout from './hoc/Layout';
import StartPage from './containers/StartPage/StartPage';
import Rules from './containers/Rules/Rules';
import Stats from './containers/Stats/Stats';
import Modal from './components/UI/Modal/Modal';
import Register from './components/Forms/Register/Register';
import Login from './components/Forms/Login/Login';
import store from './store';
import PrivateRoute from './hoc/PrivateRoute';
import Games from './containers/Game/Game';

const mapStateToProps = state => ({
  modal: state.modal,
  auth: state.auth
});

@connect(
  mapStateToProps,
  { hideModal: ModalActions.hideModal }
)
class App extends Component {
  static defaultProps = {
    hideModal: null,
    modal: null,
    auth: null
  };

  componentWillMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwtDecode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
      }
    }
  }

  onCloseModalClick = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  render() {
    const {
      modal: { modalType, show },
      auth: { isAuthenticated }
    } = this.props;
    let form = null;

    if (modalType === 'Login') {
      form = <Login />;
    } else if (modalType === 'Register') {
      form = <Register />;
    }
    return (
      <BrowserRouter>
        <Layout>
          <Wrapper>
            <Modal show={show} modalClosed={this.onCloseModalClick}>
              {form}
            </Modal>
            <Switch>
              <Route path="/" exact component={StartPage} />
              <Route path="/rules" component={Rules} />
              <Route path="/stats" component={Stats} />
              <PrivateRoute
                path="/games"
                component={Games}
                protect={isAuthenticated}
              />
            </Switch>
          </Wrapper>
        </Layout>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  hideModal: PropTypes.func,
  modal: PropTypes.shape({
    modalType: PropTypes.string
  }),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  })
};

export default App;
