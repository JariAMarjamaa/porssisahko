import { React, useEffect, useState } from 'react';
import PopupWindow from '../PopupWindow/Popup.jsx';
import DownloadButton from '../Buttons/DonwloadingButton.jsx';

const SecondPage = ({ onClose }) => {
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [showInfoPopup,  setShowInfoPopup]  = useState(false);
    const [PopUpContent,   setPopUpContent]   = useState([]);
  
    const openInfoPopup = (type) => {
        if (type === "info")
        {
          const newPopUpContent = "Jartsan opinnäytetyö \nDemoApp, kaikenlaisilla hienoilla kikkuloilla.\nKäytetyt kikkulat:\n-React\n-MaterialUI\n-Jest\n-Robot Framework\n\n\nSovellus versio 3.3";
          setPopUpContent(newPopUpContent);
          setShowInfoPopup(true);
        }
        else
        {
          setShowVideoPopup(true);
        }
      };

      const handlePopupClose = (type) => {
        setShowInfoPopup(false);
        setPopUpContent(null); // Clear content when closing the popup
        setShowVideoPopup(false);
      };
    

      return (
    <div className="new-page-modal">
      <h1>Täällä on toinen sivu</h1>

      <br/>
      <br/>
      <br/>
      <button className="button" onClick={() => openInfoPopup("info")}>Tietoja sovelluksesta</button>
      {showInfoPopup && <PopupWindow onClose={() => handlePopupClose("info")} type="info" content={PopUpContent} />}

      <br/>
      <br/>
      <button className="button" onClick={() => openInfoPopup("video")}>Katso video Robottitestauksesta</button>
      {showVideoPopup && <PopupWindow      onClose={() => handlePopupClose("video")} type="video" content="" />} 

      <br/>
      <br/>
      <DownloadButton />  

      <br/>
      <br/>

      <button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>
    </div>
  );
};

export default SecondPage;