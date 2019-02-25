import React, { Component } from 'react';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import Wrapper from './MessageFieldStyled';
import Input from './MessageFieldComponent/Input';
import Message from './MessageFieldComponent/Message';

class MessageField extends Component {
  state = {
    message: {}
  };

  componentDidMount() {
    const textarea = document.querySelector('textarea');
    textarea.addEventListener('keydown', autosize);
    function autosize() {
      const el = this;
      setTimeout(function() {
        el.style.cssText = 'height: auto; padding:0';
        el.style.cssText = `height:${el.scrollHeight}px`;
      }, 0);
    }
    const messages = document.getElementById('message_wrapper');
    messages.scrollTop = messages.scrollHeight + 100;

    new SimpleBar(document.getElementById('message_wrapper'));

    const el = new SimpleBar(document.getElementById('message_wrapper'));
    el.getScrollElement().scrollTop = messages.scrollHeight + 100;
  }

  render() {
    return (
      <Wrapper>
        <div id="message_wrapper">
          <div className="messages">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
        </div>
        <Input />
      </Wrapper>
    );
  }
}

export default MessageField;
