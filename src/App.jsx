import React, { useState, Fragment, useEffect } from 'react';
import MainPage   from "./MainPage.tsx";
import LogIn      from "./LogIn/index.jsx";
import InfoNote   from "./noteHandling/infoNotes.jsx";

import {useStateValue} from "./State/index.js";
import { types }       from './store/actions/actionTypes.js';

import CircularProgress from '@mui/material/CircularProgress';

import './App.css';

function App() {
  const [showMainPage, setShowMainPage] = useState(false);
  const { state, actions }              = useStateValue();

  const [logging,          setLogging]          = useState(false);

  useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        console.log("APP INITIAL_STATE. userIDs: ", state.login.userIds);
        if (state.login.userIds.length !== 0)
        {
          setShowMainPage(true);
        }
        break;
      case types.LOGGING:
        //console.log("APP LOGGING");
        break;
      case types.LOGOUT_SUCCEEDED:
      case types.SIGNIN_SUCCEEDED:
        console.log("APP ", state.login.state);
        setLogging(false);
        setShowMainPage(state.login.state === types.LOGOUT_SUCCEEDED ? false : true);
        break;
      case types.LOGOUT_FAILED:
      case types.SIGNIN_FAILED:
        console.log("APP ", state.login.state);
        setLogging(false);
        break;

      default:
        break;
    }
  }, [state.login, actions]);

  const handleLogOut = () => {
    console.log("APP LOGOUT");
    setLogging(true);
    const user = state.login.userIds[0];
    actions.triggerLogOut(user);
  };

  return (
    <div>
      {logging && <div className="overlay">  <CircularProgress size={100}/> </div> }
      <InfoNote></InfoNote>

      {showMainPage ?
        <MainPage handleLogOut={() => handleLogOut()}/>
      :
        <LogIn returnResponse={(status) => setShowMainPage(status)}/>  
      }
    </div>
  );
}

export default App;
