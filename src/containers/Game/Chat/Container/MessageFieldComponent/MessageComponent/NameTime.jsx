import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './NameTimeStyled';

const nameTime = ({ username }) => {
  const getTime = () => {
    const date = new Date().toLocaleTimeString('en-GB');
    const hour = date[0] + date[1];
    const minutes = date[3] + date[4];

    return `${hour}: ${minutes}`;
  };
  const Elem = () => {
    return (
      <p>
        {username}
        <time>{getTime()}</time>
      </p>
    );
  };
  return <Wrapper>{Elem()}</Wrapper>;
};

nameTime.propTypes = {
  username: PropTypes.string.isRequired
};

export default nameTime;
