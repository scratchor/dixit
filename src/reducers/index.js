import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import avatarRatingReducer from './avatarRatingReducer';
import socketReducer from './socketReducer';
import ratingReducer from './ratingReducer';
import infoReducer from './infoReducer';
import chatReducer from './chatReducer';
import userInfoReducer from './userInfoReducer';
import dealCardsReducer from './dealCardsReducer';
import gameStatusReducer from './gameStatusReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal: modalReducer,
  avatarRating: avatarRatingReducer,
  socketReducer,
  ratingReducer,
  infoReducer,
  chatReducer,
  userInfoReducer,
  dealCardsReducer,
  gameStatusReducer
});
