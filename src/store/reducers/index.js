//import { combineReducers } from 'redux';
import loggingReducer from './loggingReducer';
import infoReducer from "./infoReducer";
import { initialState } from "../../State";
import { types } from "../actions/actionTypes";
import { combineReducers } from 'redux';

// Asentaa Reduxin olemassa olevaan projektiin
// npm install react-redux
// npm install @reduxjs/toolkit 

const mainReducer = (appState, action) => {
  const {
    login,
    info
  } = appState;

/*  if (action.type === types.APP_RESET) {
    console.log("mainReducer application reset. => resetting App to initial state");
    return {
      ...initialState,
    }
  }*/
  return {
    //const rootReducer = combineReducers({
      login: loggingReducer(login, action),
      info:  infoReducer(info, action),
    // Add other reducers here
  }
};

export default mainReducer;
/*
const rootReducer = combineReducers({
  // Specify how your reducers are combined
  login: loggingReducer,
  info:  infoReducer 
  // Add other reducers here if needed
});

export default rootReducer;*/