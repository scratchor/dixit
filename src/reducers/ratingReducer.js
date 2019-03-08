import {
  ADD_PLAYER,
  ADD_PLAYER_OLD_STATUS,
  DELETE_PLAYER,
  MAKE_MASTER,
  START_GAME,
  REPORT_ASSOCIATION,
  DELETE_STATE_PLAYERS,
  MAKE_MASTER_AFTER_DELETION
} from '../actions/types';

const initialState = {
  players: {
    playersNumber: 0,
    avatar: [],
    score: [],
    username: [],
    // status: [],
    socketsId: [],
    master: false,
    ifGameStarted: false,
    masterMadeStep: false,
    isMasterOut: false,
    association: ''
  }
};

export default function(state = initialState, action) {
  let players;
  switch (action.type) {
    // eslint-disable-next-line prettier/prettier
    case DELETE_STATE_PLAYERS:                                           // DELETE_STATE_PLAYERS
      players = {
        playersNumber: 0,
        avatar: [],
        score: [],
        username: [],
        // status: [],
        socketsId: [],
        master: false,
        ifGameStarted: false,
        masterMadeStep: false,
        association: ''
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case ADD_PLAYER:                                                       // ADD_PLAYER
      players = {
        ...state.players,
        playersNumber: state.players.playersNumber + 1,
        avatar: [...state.players.avatar, action.avatar],
        score: [...state.players.score, action.score],
        username: [...state.players.username, action.username],
        // status: [...state.players.status, action.status]
        socketsId: [...state.players.socketsId, action.socketsId]
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case ADD_PLAYER_OLD_STATUS:                                     // ADD_PLAYER_OLD_STATUS

      if (action.avatar.length === 0) {
        return state;
      }
      const bool = action.ifGameStarted === 'true';
      console.log(bool);
      players = {
        ...state.players,
        playersNumber: action.avatar.length,
        ifGameStarted: bool,
        avatar: [...state.players.avatar, ...action.avatar],
        score: [...state.players.score, ...action.score],
        username: [...state.players.username, ...action.username],
        // status: [...state.players.status, action.status],
        socketsId: [...state.players.socketsId, ...action.socketsId]
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case DELETE_PLAYER:                                                 // DELETE_PLAYER

      const i = state.players.socketsId.indexOf(action.socketId);
      const newPlayers = state.players;
      Object.values(newPlayers).forEach(e =>
        Array.isArray(e) ? e.splice(i, 1) : false
      );

      players = {
        ...state.players,
        playersNumber: state.players.playersNumber - 1,
        avatar: newPlayers.avatar,
        score: newPlayers.score,
        username: newPlayers.username,
        // status: [...state.players.status, action.status],
        socketsId: newPlayers.socketsId
      };
      console.log(state);
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case MAKE_MASTER:                                                         // MAKE_MASTER

      players = {
        ...state.players,
        master: true
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case START_GAME:                                                       // START_GAME

      players = {
        ...state.players,
        ifGameStarted: true
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case REPORT_ASSOCIATION:                                           // REPORT_ASSOCIATION

      players = {
        ...state.players,
        masterMadeStep: true,
        association: action.association
      };
      return {
        ...state,
        players
      };
    // eslint-disable-next-line prettier/prettier
    case MAKE_MASTER_AFTER_DELETION:                                // MAKE_MASTER_AFTER_DELETION

      players = {
        ...state.players,
        masterMadeStep: true,
        isMasterOut: true,
        master: true
      };
      return {
        ...state,
        players
      };
    default:
      return state;
  }
}
