import { React, useState } from 'react';

import Dialog             from '@mui/material/Dialog';
import DialogActions      from '@mui/material/DialogActions';
import DialogContent      from '@mui/material/DialogContent';
import DialogContentText  from '@mui/material/DialogContentText';
import DialogTitle        from '@mui/material/DialogTitle';
import Slide              from '@mui/material/Slide';
import Button             from '@mui/material/Button';

import PopupWindow        from "../PopupWindow/Popup.jsx";

import {useStateValue} from "../State/index.js";

import { toc, priceInfo }  from '../content/text_content.jsx';


const ButtonList = ({ lowestPrice, highestPrice, simulationCallback }) => { 
  const { state, actions } = useStateValue();
  const [openDialog,      setDialogOpen]    = useState(false);
  const [dialogContent,   setDialogContent] = useState("");
  const [dialogTitle,     setdialogTitle]   = useState("");

  const [excelDonwload,   setExcelDownload]   = useState(false);

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

  const handleExcelDonwload = (excelLoadingState) => {
    setExcelDownload(excelLoadingState);
  };

  const closePopup = () => {
    setExcelDownload(false);
  }

  const handleLogOut = () => {
    console.log("BUTTONLIST LOGOUT");
    const user = state.login.userIds[0];
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googlePicture"); 

    actions.triggerLogOut(user);
  };

  return (
    <div style={{ backgroundColor: 'beige', padding: "15px" }}>
    <button className="button" onClick={() => handleOpenDialog("toc")} >Sisällysluettelo</button>
    <br></br>
    
    <button className="button" onClick={() => handleOpenDialog("prices")} >Hinta tiedot</button>
    <br></br>
    
    <button className="button" onClick={() => actions.triggerShowCalendarInfo()}>Kalenterin ohje</button>
    <br></br>
    
    <button className="button" onClick={() => simulationCallback()} >Simuloi sähkökatko!</button>
    <br></br>

    <button className="button" onClick={() => handleExcelDonwload(true)} >Excel</button>
    <br></br>
    <br></br>
    <button className="button bgColorGreen" onClick={() => handleLogOut()} >Kirjaudu ulos</button>

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

    { excelDonwload &&  <PopupWindow onClose={closePopup} type="excelDownload" content=""></PopupWindow> } 

    </div>
   
  );
};

export default ButtonList;