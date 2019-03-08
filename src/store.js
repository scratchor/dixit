import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware';
import logger from 'redux-logger';

import rootReducer from './reducers';

const initialState = {};

let token = sessionStorage.getItem('jwtToken');
if (!token) {
  token = '';
}
const socket = io('http://localhost:5000', {
  query: `auth_token=${token}`,
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  agent: false, // [2] Please don't set this to true
  upgrade: false,
  rejectUnauthorized: false
  // 'reconnection delay': 2500,
  // secure: true,
  // 'max reconnection attempts': 10,
  // reconnection: true
});

// Connection succeeded
socket.on('success', function(data) {
  console.log(data.message);
});

socket.on('joinRoom', data => {
  if (data.isAuthenticated) {
    socket.emit('joinRoom', 'game1');
  }
});

const middleware = [thunk, socketIoMiddleware(socket), logger];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
export { socket };
