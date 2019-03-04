import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './NameTimeStyled';

const nameTime = ({ username, date }) => {
  const getTime = () => {
    const date = new Date().toLocaleTimeString('en-GB');
    const hour = date[0] + date[1];
    const minutes = date[3] + date[4];

    return `${hour}:${minutes}`;
  };

  const Elem = () => {
    return (
      <p>
        {username}
        <time id="time">{date}</time>
      </p>
    );
  };
  return <Wrapper>{Elem()}</Wrapper>;
};

nameTime.defaultProps = {
  username: 'Player'
};

nameTime.propTypes = {
  username: PropTypes.string
};

export default nameTime;
