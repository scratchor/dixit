import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as AuthActions from '../../../actions/authActions';
import * as ModalActions from '../../../actions/modalActions';

import Wrapper from './RegisterStyled';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidUpdate() {
    const {
      auth: { isSuccessRegister },
      hideModal
    } = this.props;
    if (isSuccessRegister) {
      hideModal();
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { name, email, password, password2 } = this.state;
    const { registerUser } = this.props;

    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2
    };

    registerUser(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <Wrapper onSubmit={this.onSubmit}>
        <label>
          Username
          <input
            type="text"
            name="name"
            placeholder="Username"
            onChange={this.onChange}
          />
        </label>
        <p>{errors.name}</p>
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
        <label>
          Confirm
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
        </label>
        <p>{errors.password2}</p>
        <button type="submit">Register</button>
      </Wrapper>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    action: PropTypes.string
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }).isRequired,
  modal: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string
  }).isRequired,
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
    modal: state.modal
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      registerUser: AuthActions.registerUser,
      hideModal: ModalActions.hideModal,
      loginUser: AuthActions.loginUser
    }
  )(Register)
);
