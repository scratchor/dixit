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
  query: `auth_token=${token}`
});

// Connection failed
// socket.on('error', function(err) {
//   console.log(err);
//   throw new Error(err);
// });
// Connection succeeded
socket.on('success', function(data) {
  console.log(data.message);
});

const middleware = [thunk, socketIoMiddleware(socket), logger];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
export { socket };
