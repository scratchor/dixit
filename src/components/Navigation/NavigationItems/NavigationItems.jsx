import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as AuthActions from '../../../actions/authActions';
import * as ModalActions from '../../../actions/modalActions';

import Wrapper from './NavigationItemsStyled';
import NavigationItem from './NavigationItem/NavigationItem';

import Button from '../../UI/Button/Button';

class NavigationItems extends Component {
  static defaultProps = {
    showModal: null
  };

  logoutHandlerClick = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const { showModal } = this.props;
    const {
      auth: { isAuthenticated }
    } = this.props;

    const authLinks = (
      <Button clicked={this.logoutHandlerClick} name="Logout" />
    );

    const guestLinks = (
      <>
        <Button clicked={() => showModal('Login')} name="Login" />
        <Button clicked={() => showModal('Register')} name="Register" />
      </>
    );

    return (
      <Wrapper>
        <NavigationItem path="/" exact name="Home" />
        <NavigationItem path="/rules" name="Game rules" />
        <NavigationItem path="/stats" name="Stats" />
        <NavigationItem path="/protected" name="Protected" />
        {isAuthenticated ? authLinks : guestLinks}
      </Wrapper>
    );
  }
}

NavigationItems.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  showModal: PropTypes.func,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  show: state.modal,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { showModal: ModalActions.showModal, logoutUser: AuthActions.logoutUser }
  )(NavigationItems)
);
