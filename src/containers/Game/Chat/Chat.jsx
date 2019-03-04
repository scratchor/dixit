import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar';
import Wrapper from './ChatStyled';
import SendField from './Container/SendField';
import MessageField from './Container/MessageField';
import sendChatMessage from '../../../actions/chatAction';

class Chat extends Component {
  handleClick = () => {
    console.log(' Chat handleClick');
    const textarea = document.getElementById('textarea');
    if (textarea.value.trim().length > 0) {
      const getTime = () => {
        const date = new Date().toLocaleTimeString('en-GB');
        const hour = date[0] + date[1];
        const minutes = date[3] + date[4];
        return `${hour}:${minutes}`;
      };
      const { props } = this;
      const { user } = this.props;
      const { avatar, username, socketId } = user;
      const time = getTime();
      props.sendChatMessage(textarea.value, avatar, username, socketId, time);
      textarea.value = '';
    }
  };

  handleKeyPress = e => {
    console.log(' Chat handleKeyPress');
    if (e.charCode === 13) {
      e.preventDefault();
      const textarea = document.getElementById('textarea');
      if (textarea.value.trim().length > 0) {
        const getTime = () => {
          const date = new Date().toLocaleTimeString('en-GB');
          const hour = date[0] + date[1];
          const minutes = date[3] + date[4];
          return `${hour}:${minutes}`;
        };
        const { props } = this;
        const { user } = this.props;
        const { avatar, username, socketId } = user;
        const time = getTime();
        props.sendChatMessage(textarea.value, avatar, username, socketId, time);
        textarea.value = '';
      }
    }
  };

  render() {
    const handles = {};
    handles.click = this.handleClick;
    handles.press = this.handleKeyPress;
    return (
      <Wrapper>
        <MessageField press={this.handleKeyPress} />
        <SendField click={this.handleClick} />
      </Wrapper>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
  return {
    user: state.userInfoReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendChatMessage: (message, avatar, username, socketId, date) =>
      dispatch(sendChatMessage(message, avatar, username, socketId, date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
