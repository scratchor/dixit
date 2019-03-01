import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './InputStyled';

class Input extends Component {
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
  }

  render() {
    return (
      <Wrapper>
        <textarea rows="2" placeholder="Type your message" />
      </Wrapper>
    );
  }
}

Input.propTypes = {};

export default Input;
