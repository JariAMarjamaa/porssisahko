import { React, useState, Fragment } from 'react';

import Dialog             from '@mui/material/Dialog';
import DialogActions      from '@mui/material/DialogActions';
import DialogContent      from '@mui/material/DialogContent';
import DialogContentText  from '@mui/material/DialogContentText';
import DialogTitle        from '@mui/material/DialogTitle';
import Slide              from '@mui/material/Slide';
import Button             from '@mui/material/Button';

import Snackbar           from '@mui/material/Snackbar';
import IconButton         from '@mui/material/IconButton';
import CloseIcon          from '@mui/icons-material/Close';

import { toc, CalendarInfoContent, priceInfo/*, APITestContent*/ }  from '../content/text_content.jsx';


const ButtonList = ({ lowestPrice, highestPrice, simulationCallback }) => { 
  const [openDialog,      setDialogOpen]    = useState(false);
  const [dialogContent,   setDialogContent] = useState("");
  const [dialogTitle,     setdialogTitle]   = useState("");

  const [openSnackbar,    setSnackbarOpen]    = useState(false);
  const [snackbarBGColor, setSnackbarBGColor] = useState("green");
  const [snackbarContent, setSnackbarContent] = useState("");
  
  const handleSnackbarClick = (type) => {
    if (type === "calendar")
    {
      setSnackbarBGColor("green");
      setSnackbarContent(CalendarInfoContent);
      setSnackbarOpen(true);
    }
    else
    {
      //setSnackbarBGColor("red");
      //setSnackbarContent(APITestContent);
      //setSnackbarOpen(true);
      simulationCallback(); // make real api call, instead of showing snackbar note
    }
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

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogContent("");
  };

  const handleOpenDialog = (type) => {
    setDialogOpen(true);
    if (type === "toc")
    {
      setdialogTitle("Sisältöluettelo:");
      setDialogContent(toc);
    }
    else if (type === "prices")
    {
      setdialogTitle("Hintatiedot:");
      setDialogContent( priceInfo(lowestPrice, highestPrice) );
    }
  };


  return (
    <div>
    <button className="button" onClick={() => handleOpenDialog("toc")} >Sisällysluettelo</button>
    <br></br>
    
    <button className="button" onClick={() => handleOpenDialog("prices")} >Hinta tiedot</button>
    <br></br>
    
    <button className="button" onClick={() => handleSnackbarClick("calendar")}>Kalenterin ohje</button>
    <br></br>
    
    <button className="button" onClick={() => handleSnackbarClick("apiFailSimulation")} >Simuloi sähkökatko!</button>

    <Dialog
      open={openDialog}
      TransitionComponent={Slide}
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description" >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" data-testid="RFW_ButtonListDialogContent">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>JEP</Button>
      </DialogActions>
    </Dialog>

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

export default ButtonList;