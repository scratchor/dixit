import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './GameStyled';
import Rating from './Rating/Rating';
import GameWindow from './GameWindow/GameWindow';
import Chat from './Chat/Chat';
import NotificationComp from './NotificationComp/NotificationComp';
import { socket } from '../../store';
import deleteStatePlayers from '../../actions/deleteStatePlayers';

class Game extends Component {
  componentWillMount() {
    let token = sessionStorage.getItem('jwtToken');

    const newToken = token.split('');
    newToken.splice(0, 7);
    token = newToken.join('');

    socket.emit('action', {
      type: 'Authentification',
      token
    });
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
    socket.emit('disconnecting');
    const { props } = this;
    props.deleteStatePlayers();
  }

  componentWillUnmount() {
    socket.emit('disconnecting');
    const { props } = this;
    props.deleteStatePlayers();
  }

  render() {
    return (
      <Wrapper>
        <Rating />
        <GameWindow />
        <Chat />
        <NotificationComp />
      </Wrapper>
    );
  }
}

Game.propTypes = {
  deleteStatePlayers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStatePlayers: () => dispatch(deleteStatePlayers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
