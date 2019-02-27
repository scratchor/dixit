import { START_GAME, INFO_ABOUT_START, INFO_ABOUT_ASSOCIATION } from './types';
import { socket } from '../store';

const killStartButton = () => {
  return {
    type: START_GAME,
    ifGameStarted: true
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

export default () => {
  return dispatch => {
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
