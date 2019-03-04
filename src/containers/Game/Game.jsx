import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './GameStyled';
import Rating from './Rating/Rating';
import GameWindow from './GameWindow/GameWindow';
import Chat from './Chat/Chat';
import { socket } from '../../store';
import deleteStatePlayers from '../../actions/deleteStatePlayers';

class Game extends Component {
  componentWillMount() {
    const token = sessionStorage.getItem('jwtToken');
    socket.emit('action', {
      type: 'Authentication',
      token
    });

    socket.on('newUser', data => {
      console.log(data.message);
    });

    socket.on('value', data => console.log(data));
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
