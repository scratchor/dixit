import {
  ADD_PLAYER,
  ADD_PLAYER_OLD_STATUS,
  DELETE_PLAYER,
  MAKE_MASTER,
  START_GAME,
  REPORT_ASSOCIATION
} from '../actions/types';

const initialState = {
  players: {
    playersNumber: 0,
    avatar: [],
    // score: [],
    username: [],
    // status: [],
    socketsId: [],
    master: false,
    ifGameStarted: false,
    masterMadeStep: false,
    association: ''
  }
};

export default function(state = initialState, action) {
  let players;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case ADD_PLAYER:                                                            // ADD_PLAYER
      console.log('ADD_PLAYER', action);
      players = {
        ...state.players,
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
    // eslint-disable-next-line prettier/prettier
    case ADD_PLAYER_OLD_STATUS:                                              // ADD_PLAYER_OLD_STATUS
      console.log('ADD_PLAYER_OLD_STATUS', action);
      if (action.avatar.length === 0) {
        return state;
      }
      players = {
        ...state.players,
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
    // eslint-disable-next-line prettier/prettier
    case DELETE_PLAYER:                                                         // DELETE_PLAYER
      console.log('DELETE_PLAYER', action);
      const i = state.players.socketsId.indexOf(action.socketId);
      const newPlayers = state.players;
      Object.values(newPlayers).forEach(e =>
        Array.isArray(e) ? e.splice(i, 1) : false
      );

      players = {
        ...state.players,
        playersNumber: state.players.playersNumber - 1,
        avatar: newPlayers.avatar,
        // score: [...state.players.score, action.score],
        username: newPlayers.username,
        // status: [...state.players.status, action.status],
        socketsId: newPlayers.socketsId
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case MAKE_MASTER:                                                         // MAKE_MASTER
      console.log('MAKE_MASTER', action);
      players = {
        ...state.players,
        master: true
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case START_GAME:                                                            // START_GAME
      console.log('START_GAME', action);
      players = {
        ...state.players,
        ifGameStarted: action.ifGameStarted
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case REPORT_ASSOCIATION:                                                            // REPORT_ASSOCIATION
      console.log('REPORT_ASSOCIATION', action);
      players = {
        ...state.players,
        masterMadeStep: true,
        association: action.association
      };
      return {
        ...state,
        players
      };
    default:
      return state;
  }
}
