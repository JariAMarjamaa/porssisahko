import { React, useState } from 'react';
import PopupWindow from '../PopupWindow/Popup.jsx';

import './Pages.css';

const FourthPage = () => {
    const [showVideoPopup, setShowVideoPopup] = useState(false);

    const openPopupWindow = (type) => {
      setShowVideoPopup(true);
    };

    const handlePopupClose = (type) => {
      setShowVideoPopup(false);
    };

    return (
      <div className="new-page-modal">
        <h1>Neljäs sivu</h1>
        <br/>
        <br/>
        <br/>

        <h3>Robottitestaus:</h3>
        <button className="button" onClick={() => openPopupWindow("video")}>Katso video</button>
        {showVideoPopup && <PopupWindow   onClose={() => handlePopupClose("video")} type="video" content="" />} 

        <br/>
        <br/>
      </div>
    );
};

export default FourthPage;