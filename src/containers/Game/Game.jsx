import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Wrapper from './GameStyled';
import Rating from './Rating/Rating';
import GameWindow from './GameWindow/GameWindow';
import Chat from './Chat/Chat';
import getPlayerAvatar from '../../actions/avatarRating';
import { socket } from '../../store';

class Game extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    socket.emit('action', {
      type: 'Authentication',
      token
    });

    socket.on('newUser', data => {
      console.log(data.message);
    });

    socket.on('value', data => console.log(data));

    socket.on('joinRoom', data => {
      if (data.isAuthenticated) {
        socket.emit('joinRoom', 'game1');
      }
    });
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

const mapStateToProps = state => {
  return {
    post: state.avatar
  };
};

// const mapDispatchToProps = dispatch => {
// //   return {
// //     getPlayerAvatar: () => dispatch(getPlayerAvatar())
// //   };
// // };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Game);
