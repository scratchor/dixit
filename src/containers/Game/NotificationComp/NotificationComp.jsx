import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from './Notification/Notification';
import Wrapper from './NotificationCompStyled';

const NotificationComp = props => {
  const { infoReducer } = props;
  const { startGameInfo, message } = infoReducer;
  const notification = startGameInfo ? (
    <Notification message={message} />
  ) : null;
  return <Wrapper>{notification}</Wrapper>;
};

NotificationComp.propTypes = {
  infoReducer: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
  return {
    infoReducer: state.infoReducer
  };
};

export default connect(mapStateToProps)(NotificationComp);
