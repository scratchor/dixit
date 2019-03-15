import {
  INFO_MASTER_ABOUT_START,
  INFO_MASTER_ABOUT_START_CHECK
} from './types';

function infoMasterAboutStart(startGameInfo) {
  return {
    type: INFO_MASTER_ABOUT_START,
    startGameInfo,
    message:
      'We already have free players in the room! And now you can start the game! To start - click the button "START!" at the upper left corner of the screen!'
  };
}

const infoMasterAboutStartCheck = () => {
  return {
    type: INFO_MASTER_ABOUT_START_CHECK
  };
};

export default () => {
  return dispatch => {
    dispatch(infoMasterAboutStartCheck());
    setTimeout(() => {
      dispatch(infoMasterAboutStart(true));
      setTimeout(() => {
        dispatch(infoMasterAboutStart(false));
      }, 20000);
    }, 1000);
  };
};
