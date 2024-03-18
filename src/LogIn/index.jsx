import { React, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff }             from '@mui/icons-material';

import {useStateValue} from "../State/index.js";
import { types }       from '../store/actions/actionTypes';

import ChartImage from "../content/chart.jpg";

import './index.css';

const LogIn = ({returnResponse}) => {
  const { state, actions } = useStateValue();
  
  const [ShowLogInButton,         setShowLogInButton]         = useState(false);
  const [ShowSignIn,              setShowSignIn]              = useState(false);
  const [ShowSignInButton,        setShowSignInButton]        = useState(false);
  const [ShowCreateAccountButton, setShowCreateAccountButton] = useState(false);

  const [userId,           setUserId]           = useState("");
  const [password,         setPassword]         = useState("");
  const [password2,        setPassword2]        = useState("");
  const [showPassword,     setShowPassword]     = useState(false);
  const [showPassword2,    setShowPassword2]    = useState(false);

  const [signing,          setsigning]          = useState(false);
 
  let userData = {};

  useEffect( () => {
    switch(state.login.state)
    {
      case "INITIAL_STATE":
        //console.log("LogIn INITIAL_STATE");
        break;
      case types.LOGGING:
        console.log("LOGIN LOGGING");
        break;
      case types.LOGIN_SUCCEEDED:
        console.log("LOGIN LOGIN_SUCCEEDED");
        setsigning(false);
        returnResponse(true);
        break;
      case types.LOGIN_FAILED:
        console.log("LOGIN LOGIN_FAILED");
        setsigning(false);
        break;
      case types.SIGNIN_SUCCEEDED:
        console.log("LOGIN SIGNIN_SUCCEEDED");
        setsigning(false);
        returnResponse(true);
        break;
      case types.SIGNIN_FAILED:
        console.log("LOGIN SIGNIN_FAILED");
        setsigning(false);
        break;

      default:
        break;
    }
  }, [state.login, returnResponse]);

  useEffect( () => {
    switch(state.info.state)
    {
      case types.SHOW_CHECK_PASSWORDS:
        console.log("LOGIN SHOW_CHECK_PASSWORDS");
        setsigning(false);
        break;
      default:
        break;
    }
  }, [state.info]);

  const handleLogIn = (event) => {
    event.preventDefault();
      
    setShowSignIn(false);
    setShowLogInButton(false);
    setShowCreateAccountButton(false);
    setsigning(true);
    userData = {
      userId: userId,
      password: password
    };

    console.log("LOGIN Trigger LogIn");
    actions.triggerLogIn(userData);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("LOGIN SignIN");

    setShowSignIn(false);
    setShowLogInButton(false);
    setShowCreateAccountButton(false);
    setsigning(true);
    userData = {
      userId: userId,
      password: password
    };

    if (password === password2)
    {
      console.log("LOGIN Trigger SignIn");
      actions.triggerSignIn(userData);
    }
    else
    {
      console.log("LOGIN Trigger Checkpasswords");
      actions.triggerShowCheckPasswords();
    }
  };

  const showSignIn = (status) => {
    if (status)
    {
      setShowSignIn(true);
      setShowLogInButton(false);
    }
    else {
      setShowSignIn(false);
      setShowLogInButton(true);
    }
  }

  const handleTogglePasswordVisibility = (selection) => {
    if (selection === "salasana")  setShowPassword(!showPassword);
    else                           setShowPassword2(!showPassword2);
  };

  const handleUserIdChange = (value) => {
    setUserId(value);
    if (value === "" || password === "")
    {
      setShowLogInButton(false);
      setShowCreateAccountButton(false);
    }
    else
    {
      setShowLogInButton(true);
      setShowCreateAccountButton(true);
    }
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
    if (value === "" || userId === "")
    {
      setShowLogInButton(false);
      setShowCreateAccountButton(false);
    }
    else
    {
      setShowLogInButton(true);
      setShowCreateAccountButton(true);
    }
  } 

  const handlePassword2Change = (value) => {
    setPassword2(value);
    if (value === "")
    {
      setShowSignInButton(false);
    }
    else
    {
      setShowSignInButton(true);
    }
  } 

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
              onChange={(event) => handleUserIdChange(event.target.value)}
              style={{ backgroundColor: 'white' }}
            />
            <br></br>
            <br></br>
            <TextField
              className="button"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Salasana"
              onChange={(e) => handlePasswordChange(e.target.value)}
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

        { ShowSignIn ?
          <div>
            <form onSubmit={handleSignIn}>
              <TextField
                className="button"
                type={showPassword2 ? 'text' : 'password'}
                name="password"
                placeholder="Vahvista salasana"
                onChange={e => handlePassword2Change(e.target.value) }
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
              {ShowSignInButton && <input className="button" type="submit" value="Rekisteröidy"></input> }
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
 
      </div>
    );
};

export default LogIn;