
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { applyMiddleware } from '../store/reducers/middleware';
import { useActions } from '../store/actions/actionCreators';
import App from '../App.jsx';

import RouteConfigs      from "../Router/router.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = applyMiddleware({ dispatch, logout: "LOG OUT" });
  const actions = useActions(state, enhancedDispatch);

  useEffect(() => {
    // Ensure the Redux DevTools extension is installed
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      window.__REDUX_DEVTOOLS_EXTENSION__.connect();
    }
  }, []);

  // APP TÄNNE. Palauttaa parametrina index.jsään
  return (
    <StateContext.Provider value={{ state, dispatch: enhancedDispatch, actions }}>
     <Router>
      <RouteConfigs>
        <App />
      </RouteConfigs>
     </Router>
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);

export const initialState = {

/*  nursingtimes: {
    List: {
      WeekData: [],
      state: undefined,
      Code: undefined
    },
  },
  snackbar: {
    queue: [],     // [{message: "Näytä tämä lyhyt viesti", color: "#FFFFFF"}, {message: "Näytä tämä lyhyt viesti2", color: "#000000"}]
    postNewMessage: {
      status: "reset",
      message: ""
    }
  },*/
  login: {
    state: checkLocalStorageForState(), 
    status: 0,
    logging: false,
    userIds: checkLocalStorage(),
    infoText: null
  },
  info: {
    state: "INITIAL_STATE",
    text: null
  },
};

function checkLocalStorageForState()  {
  if (localStorage.getItem("userIds") === null){
    return "INITIAL_STATE";
  }
  else
  {
    var parsedIds = JSON.parse(localStorage.getItem("userIds"));
    if (parsedIds.length === 0)
    {
      return "INITIAL_STATE";
    }
    else
    {
      return "LOGIN_SUCCEEDED";
    }
  }
}

function checkLocalStorage()  {
  //console.log("STATE. checkLocalStorage. ", localStorage.getItem("userIds"));

  if (localStorage.getItem("userIds") === null){
    return [];
  }
  else
  {
    var returnedIds = [];
    var parsedIds = JSON.parse(localStorage.getItem("userIds"));
    //console.log("STATE. checkLocalStorage. parsedIds", parsedIds);
 
    parsedIds.forEach(element => {
      returnedIds.push(element);
    });
    return returnedIds;
  }
}