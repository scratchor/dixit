import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './InputStyled';

class Input extends Component {
  componentDidMount() {
    const textarea = document.querySelector('textarea');
    function autosize() {
      const el = this;
      setTimeout(function() {
        el.style.cssText = 'height: auto; padding:0';
        el.style.cssText = `height:${el.scrollHeight}px`;
      }, 0);
    }
    textarea.addEventListener('keydown', autosize);
  }

  render() {
    const { press } = this.props;
    return (
      <Wrapper>
        <textarea
          rows="2"
          placeholder="Type your message"
          id="textarea"
          onKeyPress={press}
        />
      </Wrapper>
    );
  }
}

Input.propTypes = {
  press: PropTypes.func.isRequired
};

export default Input;
