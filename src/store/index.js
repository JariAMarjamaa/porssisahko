import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers';

const store = configureStore({
    reducer: mainReducer,
    // Add middleware, devtools setup, etc. here if needed
  });
  
export default store;