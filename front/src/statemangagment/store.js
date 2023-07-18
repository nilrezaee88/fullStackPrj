// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './apiSlice';
import { postReducer } from './postSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    post: postReducer,
  },
});

export default store;