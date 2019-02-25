import React, { Component } from 'react';
import Wrapper from './MessageStyled';
import Foto from './MessageComponent/Foto';
import MessageInstance from './MessageComponent/MessageInstance';
import Name from './MessageComponent/NameTime';

class Message extends Component {
  state = {
    user: {
      username: 'Eugenie'
    }
  };

  render() {
    const { user } = this.state;
    const { username } = user;

    return (
      <Wrapper>
        <Foto />
        <Name username={username} />
        <MessageInstance />
      </Wrapper>
    );
  }
}

export default Message;
