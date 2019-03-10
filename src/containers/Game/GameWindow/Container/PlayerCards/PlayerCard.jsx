import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './PlayerCardStyled';

const playerCard = props => {
  const { src, loadImages, click } = props;
  return (
    <Wrapper
      src={src}
      onLoad={loadImages}
      onClick={click}
      className="playerCard hidden"
    />
  );
};

playerCard.defaultProps = {
  src: null,
  loadImages: null,
  click: null
};

playerCard.propTypes = {
  src: PropTypes.string,
  loadImages: PropTypes.func,
  click: PropTypes.func
};

export default playerCard;
