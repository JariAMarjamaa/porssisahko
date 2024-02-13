import { React, useEffect, useState } from 'react';
import PopupWindow from '../PopupWindow/Popup.jsx';

const SecondPage = ({ onClose }) => {
    /*const [showInfoPopup,  setShowInfoPopup]  = useState(false);
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
    };*/
    

    return (
      <div className="new-page-modal">
        <h1>Toinen sivu</h1>

        <br/>
        <br/>
        <br/>
        {/*
        <button className="button" onClick={() => openInfoPopup("info")}>Tietoja sovelluksesta</button>
        {showInfoPopup && <PopupWindow onClose={() => handlePopupClose("info")} type="info" content={PopUpContent} />}
        */}

        <div>Jartsan koodausnäyte</div>
        <div>DemoApp, kaikenlaisilla hienoilla kikkuloilla.</div> 
        <div className="listing">Käytetyt kikkulat:
          <ul>
            <li>React</li>
            <li>MaterialUI</li>
            <li>Jest</li>
            <li>Robot Framework</li>
          </ul>
        </div>
        <br/>
        <br/>
        <div>Sovellus versio 3.4</div>
       
        <br/>
        <br/>

        {/*<button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>*/}
      </div>
    );
};

export default SecondPage;