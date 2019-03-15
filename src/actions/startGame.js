import {
  START_GAME,
  INFO_ABOUT_START,
  HANG_OUT_THE_CARDS_SERVER
} from './types';
import { socket } from '../store';

const killStartButton = () => {
  return {
    type: START_GAME,
    meta: { remote: true },
    ifGameStarted: true
  };
};

function infoAboutStart(startGameInfo) {
  socket.emit('action', {
    type: INFO_ABOUT_START,
    startGameInfo,
    message: 'The game has started!'
  });
}

const hangOutTheCards = () => {
  return {
    type: HANG_OUT_THE_CARDS_SERVER,
    meta: { remote: true }
  };
};

export default () => {
  return dispatch => {
    dispatch(hangOutTheCards());
    dispatch(killStartButton());
    setTimeout(() => {
      infoAboutStart(true);
    }, 1000);
    setTimeout(() => {
      infoAboutStart(false);
    }, 20000);
  };
};
