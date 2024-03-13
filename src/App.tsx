import { useState, useEffect } from 'react';
import * as React from 'react';
import MainPage   from "./MainPage.tsx";
import LogIn      from "./LogIn/index.jsx";

import {useStateValue} from "./State/index.js";
import { types }       from './store/actions/actionTypes';

import './App.css';

function App() {
  const [showMainPage, setShowMainPage] = useState(false);
  const { state, actions }              = useStateValue();

  useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        //console.log("APP INITIAL_STATE");
        break;
      case types.LOGGING:
        //console.log("APP LOGGING");
        break;
      case types.LOGOUT_SUCCEEDED:
        console.log("APP LOGOUT_SUCCEEDED");
        setShowMainPage(false);
        break;
      case types.LOGOUT_FAILED:
        console.log("APP LOGOUT_FAILED");
        break;
      default:
        break;
    }
  }, [state.login, actions]);

  const handleLogOut = () => {
    console.log("APP Trigger action LogOut: ", state.login.userIds);

    const user = state.login.userIds[0];
    actions.triggerLogOut(user);
  };

  return (
    <div>
      {showMainPage ?
        <MainPage handleLogOut={() => handleLogOut()}/>
      :
        <LogIn returnResponse={(status: boolean) => setShowMainPage(status)}/>  
      }
    </div>
  );
}

export default App;
