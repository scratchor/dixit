import React, { Component } from 'react';
import Wrapper from './ChatStyled';
import SendField from './Container/SendField';
import MessageField from './Container/MessageField';

class Chat extends Component {
  render() {
    return (
      <Wrapper>
        <MessageField />
        <SendField />
      </Wrapper>
    );
  }
}

export default Chat;
