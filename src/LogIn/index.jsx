import { React, useState, Fragment, useEffect } from 'react';
import Snackbar         from '@mui/material/Snackbar';
import CloseIcon        from '@mui/icons-material/Close';
import Slide            from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff }             from '@mui/icons-material';

import {useStateValue} from "../State/index.js";
import { types }       from '../store/actions/actionTypes';

import ChartImage from "../content/chart.jpg";

import './index.css';

const LogIn = ({returnResponse}) => {
  const { state, actions } = useStateValue();
  
  const [ShowLogInButton,         setShowLogInButton]         = useState(true);
  const [ShowSignInButton,        setShowSignInButton]        = useState(false);
  const [ShowCreateAccountButton, setShowCreateAccountButton] = useState(true);

  const [userId,           setUserId]           = useState("");
  const [password,         setPassword]         = useState("");
  const [password2,        setPassword2]        = useState("");
  const [showPassword,     setShowPassword]     = useState(false);
  const [showPassword2,    setShowPassword2]    = useState(false);

  const [openSnackbar,     setSnackbarOpen]     = useState(false);
  const [snackbarBGColor,  setSnackbarBGColor]  = useState("green");
  const [snackbarContent,  setSnackbarContent]  = useState("");

  const [signing,          setsigning]          = useState(false);
 
  let HttpStatus = "";
  let userData = {};

  useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        //console.log("LogIn INITIAL_STATE");
        break;
      case types.LOGGING:
        //console.log("LogIn LOGGING");
        break;
      case types.LOGIN_SUCCEEDED:
        console.log("LogIn LOGIN_SUCCEEDED -> show main page");
        setsigning(false);
        returnResponse(true);
        break;
      case types.LOGIN_FAILED:
        console.log("LogIn LOGIN_FAILED");
        setsigning(false);
        handleOpenSnackbar(state.login.status, state.login.infoText);
        break;
      default:
        break;
    }
  }, [state.login, actions]);

  const handleOpenSnackbar = (status, text) => {
      //401 = väärä tunnus/salasana. 406 = validointi virhe, 500 = tunnus käytössä, 700 = salasana väärin kirjautumisessa
      setShowSignInButton(status === 700 ? true : false);
      setShowLogInButton( status === 700 ? false : true);
      setSnackbarBGColor( status === 401 ? "green" : "red");
      setShowCreateAccountButton(true);
      setSnackbarContent(text);
      setSnackbarOpen(true);
      setsigning(false);
  };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    const action = (
      <Fragment>
        {/*<Button color="error" size="small" onClick={handleSnackbarClose}>
          EIKU
          </Button>*/}
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

    const handleLogIn = (event) => {
      event.preventDefault();
      
      setShowSignInButton(false);
      setShowLogInButton(false);
      setShowCreateAccountButton(false);
      setsigning(true);
      userData = {
        userId: userId,
        password: password
      };

      console.log("COMP Trigger action LogIn");
      actions.triggerLogIn(userData);

    };

    const handleSignIn = (event) => {
      event.preventDefault();
      setShowSignInButton(false);
      setShowLogInButton(false);
      setsigning(true);
      userData = {
        userId: userId,
        password: password
      };

      if (password === password2)
      {
      //Myös SignIn post-metodilla, muuten parametrit näkyy urlissa
      //fetch("http://localhost:4000/SignIn", {
      fetch("https://backend-nu-mauve.vercel.app/SignIn", { 
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)})
        .then(response => { 
          HttpStatus = response.status;
          return response.json(response );
        })
        .then(data => {
          if (data.response === "FAIL" ) {
            handleOpenSnackbar(HttpStatus, data.errorMsg);
          } else {
            returnResponse(true);
          }
          setsigning(false);
        })
        .catch(error => {
          handleOpenSnackbar(800, "Serveri yhteysvirhe!");
        });
      }
      else
      {
        handleOpenSnackbar(700, "Tarkista salasana");
      }
    };

    const showSignIn = (status) => {
      if (status)
      {
        setShowSignInButton(true);
        setShowLogInButton(false);
      }
      else {
        setShowSignInButton(false);
        setShowLogInButton(true);
      }
    }

    const handleTogglePasswordVisibility = (selection) => {
      if (selection === "salasana")  setShowPassword(!showPassword);
      else                           setShowPassword2(!showPassword2);
    };

    return (
      <div className="loginPage">
        <h1 data-testid="RFW_MainPageText">Pörssisähkökäppyrä harjoitus</h1>

        <div className="chartImage">
          <img className="horizontalSpin" src={ChartImage} alt="Käppyrä"/>
        </div>

        <br/>
        <br/>
        <h3>Sisäänkirjautuminen:</h3>
        <br></br>
        <br></br>

        {signing && <div className="overlay">  <CircularProgress size={100}/> </div> }

        <div>
          <form onSubmit={handleLogIn}>
            <TextField
              className="button"
              type="text"
              name="userID"
              placeholder="Tunnus"
              onChange={(event) => setUserId(event.target.value)}
              style={{ backgroundColor: 'white' }}
            />
            <br></br>
            <br></br>
            <TextField
              className="button"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Salasana"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton data-testid="RFW_TooglePassWordVisibility" onClick={() => handleTogglePasswordVisibility("salasana")} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              style={{ backgroundColor: 'white' }}
            />
            
            <br></br>
            <br></br>
            { ShowLogInButton && <input data-testid="RFW_LogInButton" className="button" type="submit" value="Kirjaudu sisään"></input> }
          </form>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        { ShowSignInButton ?
          <div>
            <form onSubmit={handleSignIn}>
              <TextField
                className="button"
                type={showPassword2 ? 'text' : 'password'}
                name="password"
                placeholder="Vahvista salasana"
                onChange={e => setPassword2(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleTogglePasswordVisibility("salasana2")} edge="end">
                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                style={{ backgroundColor: 'white' }}
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <input className="button" type="submit" value="Rekisteröidy"></input>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </form>
            <button className="button" onClick={() => showSignIn(false)} >Peruuta</button>
          </div>
          : 
            ShowCreateAccountButton &&           
          <div>
            <button className="button" onClick={() => showSignIn(true)} >Luo tunnus</button>
          </div>
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
};

export default LogIn;