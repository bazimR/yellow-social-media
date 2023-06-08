import { combineReducers } from '@reduxjs/toolkit';


// Import other reducers
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // Other individual reducers
});

export default rootReducer;