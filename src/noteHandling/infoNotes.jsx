import { React, useState, Fragment, useEffect } from 'react';
import Snackbar        from '@mui/material/Snackbar';
import CloseIcon       from '@mui/icons-material/Close';
import Slide           from '@mui/material/Slide';
import { IconButton }  from '@mui/material';

import {useStateValue} from "../State/index.js";
import { types }       from '../store/actions/actionTypes';

const InfoNote = ({}) => {
  const { state, actions } = useStateValue();
  const [openSnackbar,     setSnackbarOpen]     = useState(false);
  const [snackbarBGColor,  setSnackbarBGColor]  = useState("green");
  const [snackbarContent,  setSnackbarContent]  = useState("");

   useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        break;
      case types.LOGGING:
        break;
      case types.LOGIN_SUCCEEDED:
        break;
      case types.CHECK_PASSWORDS:
        console.log("INFONOTE CHECK_PASSWORDS");
        handleOpenSnackbar(700, state.login.infoText);
        break;
      case types.LOGIN_FAILED:
        console.log("INFONOTE LOGIN_FAILED");
        handleOpenSnackbar(state.login.status, state.login.infoText);
        break;

      case types.SIGNIN_SUCCEEDED:
        break;
      case types.SIGNIN_FAILED:
        console.log("INFONOTE SIGNIN_FAILED");
        handleOpenSnackbar(state.login.status, state.login.infoText);
        break;

      default:
      break;
    }
  }, [state.login]);

  useEffect( () => {
    switch(state.info.state)
    {
      case "INITIAL_STATE":
        break;
      case types.SHOW_CALENDAR_INFO:
      case types.SHOW_CHECK_PASSWORDS:
        console.log("INFONOTE ",state.info.state);
        handleOpenSnackbar(200, state.info.text);
        break;
      default:
        break;
    }
  }, [state.info]);

  const handleOpenSnackbar = (status, text) => {
      //401 = väärä tunnus/salasana. 406 = validointi virhe, 500 = tunnus käytössä, 700 = salasana väärin kirjautumisessa
      setSnackbarBGColor( status === 200 || status === 401 ? "green" : "red");
      setSnackbarContent(text);
      setSnackbarOpen(true);
  };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
      actions.triggerClearInfoState();
    };

    const action = (
      <Fragment>
        {/*<Button color="error" size="small" onClick={handleSnackbarClose}> EIKU </Button>*/}
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
      <div className="infoNote">

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
};

export default InfoNote;