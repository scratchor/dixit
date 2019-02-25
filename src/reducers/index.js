import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import avatarRatingReducer from './avatarRatingReducer';
import socketReducer from './socketReducer';
import ratingReducer from './ratingReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal: modalReducer,
  avatarRating: avatarRatingReducer,
  socketReducer,
  ratingReducer
});
