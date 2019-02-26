import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './AvatarButtonStyled';

class AvatarButton extends Component {
  static defaultProps = {
    props: PropTypes.shape({
      url: 'sdfsdfsdf',
      master: false
    })
  };

  componentDidUpdate() {
    const { props } = this.props;
    const { master } = props;
    if (master) {
      const elem = document.querySelector('.fancy-button');
      elem.addEventListener('mousedown', () => {
        elem.addEventListener('animationend', () => {
          elem.classList.remove('active');
        });
        elem.classList.add('active');
      });
    }
  }

  render() {
    const { props } = this.props;
    const { master, url } = props;
    const Elem = master ? (
      <div className="fancy-button">
        <div className="left-frills frills" />
        <div className="button" />
        <div className="right-frills frills" />
      </div>
    ) : (
      <div className="avatar" style={{ backgroundImage: `url(${url})` }} />
    );
    return <Wrapper>{Elem}</Wrapper>;
  }
}

AvatarButton.propTypes = {
  props: PropTypes.shape({
    url: PropTypes.string,
    master: PropTypes.bool.isRequired
  })
};

export default AvatarButton;
