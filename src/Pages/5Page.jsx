import { React, useState } from 'react';

import LogInFailMsgSequence from "../content/LogInFailMsgSequence.jpg";
import LogInOkMsgSequence   from "../content/LogInOkMsgSequence.jpg";
import LogOutMsgSequence    from "../content/LogOutMsgSequence.jpg";

//npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import './Pages.css';

const FifthPage = () => {
  const [chartNumber, setchartNumber]  = useState(0);

  const handleSelection = (number) => {
    setchartNumber(number === chartNumber ? 0 : number);
  }

    
  return (
      <div className="router-page">
        <h1>SW Dokumentointi:</h1>
        <h3>Tikku-Ukon seikkailut:</h3>

        <div>Sisään kirjautuminen:</div>
        <div>Väärä tunnus tai salasana <PhotoLibraryIcon color="primary" onClick={() => handleSelection(1)}></PhotoLibraryIcon></div>
        { chartNumber === 1 && <div> <img className="swChart" src={LogInFailMsgSequence} alt="Kuva1"/> </div> }

        <br></br>

        <div>Sisään kirjautuminen Ok: <PhotoLibraryIcon color="secondary" onClick={() => handleSelection(2)}></PhotoLibraryIcon></div>
        { chartNumber === 2 && <div> <img className="swChart" src={LogInOkMsgSequence} alt="Kuva2"/> </div> }

        <br></br>

        <div>Ulos kirjautuminen:<PhotoLibraryIcon color="success" onClick={() => handleSelection(3)}></PhotoLibraryIcon></div>
        { chartNumber === 3 && <div> <img className="swChart" src={LogOutMsgSequence} alt="Kuva3"/> </div> }

      </div>
    );
};

export default FifthPage;