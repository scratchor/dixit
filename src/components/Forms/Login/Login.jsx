import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AuthActions from '../../../actions/authActions';
import * as ModalActions from '../../../actions/modalActions';

import Wrapper from './LoginStyled';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const {
      hideModal,
      history: { push }
    } = this.props;

    if (nextProps.auth.isAuthenticated) {
      hideModal();
      push('/protected');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { email, password } = this.state;
    const { loginUser } = this.props;

    e.preventDefault();

    const userData = {
      email,
      password
    };

    loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Wrapper onSubmit={this.onSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
          />
        </label>
        <p>{errors.email}</p>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
        </label>
        <p>{errors.password}</p>
        <button type="submit">Log in</button>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    action: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser: AuthActions.loginUser, hideModal: ModalActions.hideModal }
  )(Login)
);
