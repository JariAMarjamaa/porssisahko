import { React, useState } from 'react';
import PopupWindow from '../PopupWindow/Popup.jsx';

const FourthPage = ({ onClose }) => {
    const [showVideoPopup, setShowVideoPopup] = useState(false);
  
    const handlePopupClose = (type) => {
      setShowVideoPopup(false);
    };
    

    return (
      <div className="new-page-modal">
        <h1>Neljäs sivu</h1>

        <br/>
        <br/>
        <br/>

        <button className="button" onClick={() => openInfoPopup("video")}>Katso video Robottitestauksesta</button>
        {showVideoPopup && <PopupWindow      onClose={() => handlePopupClose("video")} type="video" content="" />} 

        <br/>
        <br/>

        <button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>
      </div>
    );
};

export default FourthPage;