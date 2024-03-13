//import { combineReducers } from 'redux';
import loggingReducer from './loggingReducer';
import { initialState } from "../../State";
import { types } from "../actions/actionTypes";


// Asentaa Reduxin olemassa olevaan projektiin
// npm install react-redux
// npm install @reduxjs/toolkit 

/*const mainReducer = (appState, action) => {
  const {
    login
  } = appState;

  if (action.type === types.APP_RESET) {
    console.log("mainReducer application reset. => resetting App to initial state");
    return {
      ...initialState,
    }
  }
  return {
    //const rootReducer = combineReducers({
    loggingReducer: loggingReducer(login, action),
    // Add other reducers here
  }
};

export default mainReducer;*/

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  login: loggingReducer, // Specify how your reducers are combined
  // Add other reducers here if needed
});

export default rootReducer;