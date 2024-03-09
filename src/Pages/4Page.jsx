import { React, useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar           from '@mui/material/Snackbar';
import IconButton         from '@mui/material/IconButton';
import CloseIcon          from '@mui/icons-material/Close';
import Slide              from '@mui/material/Slide';

import './Pages.css';

const FourthPage = () => {
  const [userName,  setUserNameValue] = useState('');
  const [textValue, setTextValue]     = useState('');
  const [sending,   setSendingValue]  = useState(false);

  const [openSnackbar,    setSnackbarOpen]    = useState(false);
  const [snackbarBGColor, setSnackbarBGColor] = useState("green");
  const [snackbarContent, setSnackbarContent] = useState("");

  let feedback = {};
  let HttpStatus = "";
  const remainingChars = 500 - textValue.length;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setTextValue(inputValue);
  };

  const handleuserNameChange = (event) => {
    const inputValue = event.target.value;
    // Apply any additional logic if needed
    setUserNameValue(inputValue);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  const handleOpenSnackbar = (status, text) => {
    //406 = validointi virhe, 500 = tunnus käytössä, 700 = salasana väärin kirjautumisessa
    setSnackbarBGColor( status === 200 ? "green" : "red");
    setSnackbarContent(text);
    setSnackbarOpen(true);
    setSendingValue(false);
  };

  const sendFeedback = () => {
    if (textValue.length === 0)
    {
      setSnackbarBGColor("green");
      setSnackbarContent("Tyhjää kommenttia ei lähetetä");
      setSnackbarOpen(true);
    }
    else
    {
      setSendingValue(true);
      feedback = {
        palautteenAntaja: userName,
        palaute: textValue
        //BE huolehtii, että sheet: "Palaute"
      };

      //Myös SignIn post-metodilla, muuten parametrit näkyy urlissa
      fetch("http://localhost:4000/Feebback", {
      //fetch("https://backend-nu-mauve.vercel.app/SignIn", { 
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback)})
        .then(response => { 
          HttpStatus = response.status;
          return response.json(response );
        })
        .then(data => {
          if (data.response === "FAIL" ) {
            handleOpenSnackbar(HttpStatus, data.errorMsg);
          } 
          else {
            handleOpenSnackbar(200, "Palautteen lähetys onnistui");

          }
          setSendingValue(false);
        })
        .catch(error => {
          handleOpenSnackbar(800, "Serveri yhteysvirhe!");
        });
    }
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
    
  return (
      <div className="new-page-modal">
        <h1>Neljäs sivu</h1>
        <br/>
        <br/>
        <br/>

        {sending && <div className="overlay"> <CircularProgress size={100}/> </div> }

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
   
        <h3>Palautteen antaminen</h3>
        <TextField
          id="text-input"
          label="Vapaa ehtoinen nimi"
          value={userName}
          onChange={handleuserNameChange}
          className='palaute'/>
        
        <br></br>  
        <br></br>  
        <br></br>  

        <TextField
          id="text-input"
          label="Kirjoita palaute"
          multiline
          rows={4}
          value={textValue}
          onChange={handleChange}
          inputProps={{ maxLength: 500 }}
          className='palaute'/>

          <p style={{ fontSize: "small"}} >{`Merkkejä jäljellä: ${remainingChars}`}</p>

          <br></br>  
          <br></br>

          <button className="button" onClick={() => sendFeedback()} >Lähetä palaute</button>

      </div>
    );
};

export default FourthPage;