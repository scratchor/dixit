import {
  ADD_PLAYER,
  ADD_PLAYER_OLD_STATUS,
  DELETE_PLAYER
} from '../actions/types';

const initialState = {
  players: {
    playersNumber: 0,
    avatar: [],
    score: [],
    username: [],
    status: [],
    socketsId: []
  }
};

export default function(state = initialState, action) {
  let players;
  switch (action.type) {
    case ADD_PLAYER:
      console.log('ADD_PLAYER', action);
      players = {
        playersNumber: state.players.playersNumber + 1,
        avatar: [...state.players.avatar, action.avatar],
        // score: [...state.players.score, action.score],
        username: [...state.players.username, action.username],
        // status: [...state.players.status, action.status]
        socketsId: [...state.players.socketsId, action.socketsId]
      };
      return {
        ...state,
        players
      };
    case ADD_PLAYER_OLD_STATUS:
      console.log('ADD_PLAYER_OLD_STATUS', action);
      if (action.avatar.length === 0) {
        return state;
      }
      players = {
        playersNumber: action.avatar.length,
        avatar: [...state.players.avatar, ...action.avatar],
        // score: [...state.players.score, action.score],
        username: [...state.players.username, ...action.username],
        // status: [...state.players.status, action.status],
        socketsId: [...state.players.socketsId, ...action.socketsId]
      };
      return {
        ...state,
        players
      };
    case DELETE_PLAYER:
      console.log('DELETE_PLAYER', action);
      const i = state.players.socketsId.indexOf(action.socketId);
      // eslint-disable-next-line prefer-destructuring
      const newPlayers = state.players;
      Object.values(newPlayers).forEach(e =>
        Array.isArray(e) ? e.splice(i, 1) : false
      );
      // players.playersNumber = state.players.playersNumber - 1;
      // newplayers.avatar.splice(i, 1);
      // newplayers.username.splice(i, 1);
      // newplayers.socketsId.splice(i, 1);

      players = {
        playersNumber: state.players.playersNumber - 1,
        avatar: newPlayers.avatar,
        // score: [...state.players.score, action.score],
        username: newPlayers.username,
        // status: [...state.players.status, action.status],
        socketsId: newPlayers.socketsId
      };
      console.log('DELETE_PLAYER', players);
      return {
        ...state,
        players
      };
    default:
      return state;
  }
}
