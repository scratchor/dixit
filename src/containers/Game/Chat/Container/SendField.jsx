import React, { Component } from 'react';
import Wrapper from './SendFieldStyled';
import Input from './MessageFieldComponent/Input';
import SendButton from './SendButton/SendButton';

class SendField extends Component {

  render() {
    return (
      <Wrapper>
        <SendButton />
      </Wrapper>
    );
  }
}

export default SendField;
