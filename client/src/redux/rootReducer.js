import { combineReducers } from '@reduxjs/toolkit';


// Import other reducers
import userReducer from './userSlice';
import postSlice from './postSlice';
import commentModelSlice from './commentModelSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postSlice,
  modal: commentModelSlice,
  // Other individual reducers
});

export default rootReducer;