import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './AvatarStyled';

const avatar = ({ imgObj }) => {
  return <Wrapper imgObj={imgObj} />;
};

avatar.propTypes = {
  imgObj: PropTypes.objectOf(PropTypes.string).isRequired
};

export default avatar;
