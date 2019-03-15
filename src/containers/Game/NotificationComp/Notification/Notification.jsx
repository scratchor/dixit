import React from 'react';

import PropTypes from 'prop-types';
import Wrapper from './NotificationStyled';

const Notification = ({ message }) => {
  return (
    <Wrapper>
      <div>
        <h6>Hello!</h6>
        <p>{message}</p>
      </div>
    </Wrapper>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired
};

export default Notification;
