import React, { useState, Fragment, useEffect } from 'react';
import MainPage   from "./MainPage.tsx";
import LogInPage      from "./LogIn/index.jsx";
import InfoNote   from "./noteHandling/infoNotes.jsx";

import {useStateValue} from "./State/index.js";
import { types }       from './store/actions/actionTypes.js';

import RouteConfigs      from "./Router/router.js";

import './App.css';

function App() {
  const [showMainPage, setShowMainPage] = useState(false);
  const { state, actions }              = useStateValue();

  useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        console.log("APP INITIAL_STATE. showMainPage: ", showMainPage , " userIDs: ", state.login.userIds.length);
        if (state.login.userIds.length !== 0 && !showMainPage)
        {
          //setShowMainPage(true);
        }
        break;
      case types.LOGGING:
        console.log("APP LOGGING");
        break;
      case types.LOGOUT_SUCCEEDED:
      case types.SIGNIN_SUCCEEDED:
      case types.LOGIN_SUCCEEDED:
        console.log("APP ", state.login.state);
        setShowMainPage(state.login.state === types.LOGOUT_SUCCEEDED ? false : true);
        break;
      case types.LOGOUT_FAILED:
      case types.SIGNIN_FAILED:
        console.log("APP ", state.login.state);
        break;

      default:
        console.log("APP-Default ", state.login.state);
        break;
    }
  }, [state.login, actions]);

  return (
    <div>
      <InfoNote></InfoNote>
      
	    {showMainPage || state.login.userIds.length !== 0 ? 
       <div>
       {/*<RouteConfigs/>*/}
        <MainPage />
       </div>
      :
        <LogInPage />  
      }

    </div>
  );
}

export default App;
