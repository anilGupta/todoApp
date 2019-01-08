import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './authReducer';
import todo from './todoReducer';

export default combineReducers({
  app,
  auth,
  todo,
});
