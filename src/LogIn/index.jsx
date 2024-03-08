import { React, useState, Fragment } from 'react';
import Snackbar   from '@mui/material/Snackbar';
import CloseIcon  from '@mui/icons-material/Close';
import Slide      from '@mui/material/Slide';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff }             from '@mui/icons-material';

import './index.css';

const LogIn = ({returnResponse}) => {
    const [ShowLogInButton,  setShowLogInButton]  = useState(true);
    const [ShowSignInButton, setShowSignInButton] = useState(false);

    const [userId,           setUserId]           = useState("");
    const [password,         setPassword]         = useState("");
    const [password2,        setPassword2]        = useState("");
    const [showPassword,     setShowPassword]     = useState(false);
    const [showPassword2,    setShowPassword2]    = useState(false);

    const [openSnackbar,     setSnackbarOpen]     = useState(false);
    const [snackbarBGColor,  setSnackbarBGColor]  = useState("green");
    const [snackbarContent,  setSnackbarContent]  = useState("");
 
    let HttpStatus = "";
    let userData = {};

    const handleOpenSnackbar = (status, text) => {
      //406 = validointi virhe, 500 = tunnus käytössä, 700 = salasana väärin kirjautumisessa
      setShowSignInButton(status === 700 ? true : false);
      setShowLogInButton( status === 700 ? false : true);
      setSnackbarBGColor( status === 200 ? "green" : "red");
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
      userData = {
        userId: userId,
        password: password
      };

      //fetch("http://localhost:4000/LogIn", {
      fetch("https://backend-nu-mauve.vercel.app/LogIn", {
      
      method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)})
        .then(response => {             //promise response
          //MySQL if (!response.ok) {
          // Handle non-success status codes here
          console.error("LogIn. HTTP Status: ", response.status);
          HttpStatus = response.status;
          // }
          return response.json(response);
        })
        .then(data => {
          if (data.response === "FAIL" ) {
            handleOpenSnackbar(HttpStatus, data.errorMsg);
          } else {
            returnResponse(true);
          }
        })
        .catch(error => {
          console.error("SignedIn. FATAL Error:", error.message);
        });
    };

    const handleSignIn = (event) => {
      event.preventDefault();
      setShowSignInButton(false);
      setShowLogInButton(false);
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
        })
        .catch(error => {
          console.log("SignedIn. Error:", error.message);
          // Handle errors here
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
        <br/>
        <br/>
        <h3>Sisäänkirjautuminen:</h3>
        <br></br>
        <br></br>

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
                    <IconButton onClick={() => handleTogglePasswordVisibility("salasana")} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              style={{ backgroundColor: 'white' }}
            />
            
            <br></br>
            <br></br>
            { ShowLogInButton && <input className="button" type="submit" value="Kirjaudu sisään"></input> }
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