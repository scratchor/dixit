import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './MessageStyled';
import Foto from './MessageComponent/Foto';
import MessageInstance from './MessageComponent/MessageInstance';
import Name from './MessageComponent/NameTime';

class Message extends Component {
  render() {
    const { props } = this.props;
    const { foto, message, username, date } = props;

    return (
      <Wrapper>
        <Foto foto={foto} />
        <Name username={username} date={date} />
        <MessageInstance message={message} />
      </Wrapper>
    );
  }
}

Message.propTypes = {
  props: PropTypes.shape({}).isRequired
};

export default Message;
