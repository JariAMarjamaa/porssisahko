import { React, useState, Fragment } from 'react';
import Snackbar   from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon  from '@mui/icons-material/Close';
import Slide      from '@mui/material/Slide';

import './index.css';

const LogIn = ({returnResponse}) => {
    const [userId,   setUserId]   = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar,    setSnackbarOpen]    = useState(false);
    const [snackbarBGColor, setSnackbarBGColor] = useState("green");
    const [snackbarContent, setSnackbarContent] = useState("");
 
    let HttpStatus = "";
    let userData = {};

    const handleOpenSnackbar = (status, text) => {
      //406 = validointi virhe
      setSnackbarBGColor( status === 500 || status === 200 ? "green" : "red");
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
      userData = {
        userId: userId,
        password: password
      };

      //Myös SignIn post-metodilla, muuten parametrit näkyy urlissa
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
      userData = {
        userId: userId,
        password: password
      };

      //fetch("http://localhost:4000/SignIn", {
      fetch("https://backend-self-pi.vercel.app/SignIn", { 
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
            <input className="button" type="text"     name="userID"   placeholder='Tunnus'   onChange={ event => setUserId(event.target.value)}></input>
            <br></br>
            <br></br>
            <input className="button" type="password" name="password" placeholder='Salasana' onChange={ e => setPassword(e.target.value)}></input>
            <br></br>
            <br></br>
            <input className="button" type="submit" value="Kirjaudu sisään"></input>
          </form>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <form onSubmit={handleSignIn}>
          <input className="button" type="submit" value="Rekisteröidy"></input>
        </form>

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