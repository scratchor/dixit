import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './CardStyled';
import foto from '../../../Chat/Container/MessageFieldComponent/MessageComponent/Foto';

const card = props => {
  const { src, loadImages, click } = props;
  return (
    <Wrapper className="exposedCard hidden">
      <div className="face">
        <img
          src="https://www.dropbox.com/s/uasx16bfjbv2r18/casing.jpg?raw=1"
          alt="Imaginarium card"
          onLoad={loadImages}
        />
      </div>
      <div className="back face" onClick={click}>
        <img src={src} alt="Imaginarium card" />
      </div>
    </Wrapper>
  );
};

card.defaultProps = {
  src: null
};

card.propTypes = {
  src: PropTypes.string,
  loadImages: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired
};

export default card;
