import { INFO_MASTER_TO_ENTER_ASSOSIATION } from './types';

function infoMasterAboutStart(startGameInfo, message) {
  return {
    type: INFO_MASTER_TO_ENTER_ASSOSIATION,
    startGameInfo,
    message
  };
}

export default message => {
  return dispatch => {
    setTimeout(() => {
      dispatch(infoMasterAboutStart(true, message));
      setTimeout(() => {
        dispatch(infoMasterAboutStart(false, ''));
      }, 20000);
    }, 1000);
  };
};
