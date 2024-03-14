import React, { useState, Fragment, useEffect } from 'react';
import MainPage   from "./MainPage.tsx";
import LogIn      from "./LogIn/index.jsx";

import {useStateValue} from "./State/index.js";
import { types }       from './store/actions/actionTypes.js';

import Snackbar         from '@mui/material/Snackbar';
import CloseIcon        from '@mui/icons-material/Close';
import Slide            from '@mui/material/Slide';
import { IconButton }   from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

import './App.css';

function App() {
  const [showMainPage, setShowMainPage] = useState(false);
  const { state, actions }              = useStateValue();

  const [openSnackbar,     setSnackbarOpen]     = useState(false);
  const [snackbarBGColor,  setSnackbarBGColor]  = useState("green");
  const [snackbarContent,  setSnackbarContent]  = useState("");

  const [logging,          setLogging]          = useState(false);

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
        setLogging(false);
        setShowMainPage(false);
        break;
      case types.LOGOUT_FAILED:
        console.log("APP LOGOUT_FAILED");
        setLogging(false);
        handleOpenSnackbar(state.login.status, state.login.infoText);
        break;
      default:
        break;
    }
  }, [state.login, actions]);

  const handleLogOut = () => {
    console.log("APP LogOut");
    setLogging(true);
    const user = state.login.userIds[0];
    actions.triggerLogOut(user);
  };

  const handleOpenSnackbar = (status, text) => {
    //401 = väärä tunnus/salasana. 406 = validointi virhe, 500 = tunnus käytössä, 700 = salasana väärin kirjautumisessa
    setSnackbarBGColor( status === 401 ? "green" : "red");
    setSnackbarContent(text);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      {logging && <div className="overlay">  <CircularProgress size={100}/> </div> }


      {showMainPage ?
        <MainPage handleLogOut={() => handleLogOut()}/>
      :
        <LogIn returnResponse={(status) => setShowMainPage(status)}/>  
      }

      <Snackbar
        TransitionComponent={Slide}
        ContentProps={{
          sx: {
            textAlign: 'left',
            background: snackbarBGColor,
            width: '100%',
            height: 'auto', lineHeight: '28px'  //whiteSpace: "pre-wrap"
          }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarContent}
        action={action} />
    
    </div>
  );
}

export default App;
