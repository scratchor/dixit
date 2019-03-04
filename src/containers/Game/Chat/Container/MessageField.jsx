import React, { Component } from 'react';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './MessageFieldStyled';
import Input from './MessageFieldComponent/Input';
import Message from './MessageFieldComponent/Message';

class MessageField extends Component {
  componentDidMount() {
    const messages = document.querySelector('.messages');
    messages.scrollTop = messages.scrollHeight + 100;

    // eslint-disable-next-line no-new
    new SimpleBar(document.getElementById('message_wrapper'));

    const el = new SimpleBar(document.getElementById('message_wrapper'));
    el.getScrollElement().scrollTop = messages.scrollHeight + 100;
  }

  componentDidUpdate() {
    const messages = document.querySelector('.messages');
    messages.scrollTop = messages.scrollHeight + 100;
    const el = new SimpleBar(document.getElementById('message_wrapper'));
    el.getScrollElement().scrollTop = messages.scrollHeight + 100;
  }

  render() {
    const { chat } = this.props;
    const { press } = this.props;
    const messagesList = chat.socketId.map((e, i) => {
      const chatField = {
        foto: chat.fotos[i],
        message: chat.messages[i],
        username: chat.usernames[i],
        date: chat.date[i]
      };
      return <Message key={i} props={chatField} />;
    });
    return (
      <Wrapper>
        <div id="message_wrapper">
          <div className="messages">{messagesList}</div>
        </div>
        <Input press={press} />
      </Wrapper>
    );
  }
}

MessageField.propTypes = {
  chat: PropTypes.shape({}).isRequired,
  press: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    chat: state.chatReducer.chat
  };
};

export default connect(mapStateToProps)(MessageField);
