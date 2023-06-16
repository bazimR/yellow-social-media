import { combineReducers } from '@reduxjs/toolkit';


// Import other reducers
import userReducer from './userSlice';
import postSlice from './postSlice';
import commentModelSlice from './commentModelSlice';
import storyModalSlice from './storyModalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postSlice,
  modal: commentModelSlice,
  story:storyModalSlice
  // Other individual reducers
});

export default rootReducer;