import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './SendFieldStyled';
import SendButton from './SendButton/SendButton';

class SendField extends Component {
  render() {
    const { click } = this.props;
    return (
      <Wrapper>
        <SendButton click={click} />
      </Wrapper>
    );
  }
}

SendField.propTypes = {
  click: PropTypes.func.isRequired
};

export default SendField;
