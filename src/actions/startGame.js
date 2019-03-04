import {
  START_GAME,
  INFO_ABOUT_START,
  INFO_ABOUT_ASSOCIATION,
  HANG_OUT_THE_CARDS_SERVER
} from './types';
import { socket } from '../store';

const killStartButton = () => {
  return {
    type: START_GAME,
    ifGameStarted: true
  };
};

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
      // dispatch(alertStart());
      socket.emit('action', {
        type: INFO_ABOUT_START,
        message: 'The game has started!'
      });
    }, 1000);
  };
};

function alertStart() {
  return {
    type: INFO_ABOUT_START,
    meta: { remote: true },
    message: 'The game has started!'
  };
}

function alertAboutAssosiation() {
  return {
    type: INFO_ABOUT_ASSOCIATION,
    meta: { remote: true },
    message: 'Now you should enter your association and click "GO!"'
  };
}
