import { combineReducers } from '@reduxjs/toolkit';


// Import other reducers
import userReducer from './userSlice';
import postSlice from './postSlice';
import commentModelSlice from './commentModelSlice';
import storyModalSlice from './storyModalSlice';
import viewStoryModalSlice from './viewStoryModalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postSlice,
  modal: commentModelSlice,
  story: storyModalSlice,
  viewstory: viewStoryModalSlice
  // Other individual reducers
});

export default rootReducer;