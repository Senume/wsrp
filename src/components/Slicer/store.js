import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlicer';

// Configure the Redux store with the user reducer
const store = configureStore({
  reducer: {
    user: UserReducer,
    // Add other reducers here if needed
  },
});

export default store;