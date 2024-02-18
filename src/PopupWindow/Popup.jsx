import React from 'react';
import './Popup.css';


const PopupWindow = ({ onClose, type, content }) => {
    const contentClassName = `content ${type}-content`;
    console.log("contentClassName: ", contentClassName);

    return (
    <div className="Popup-container">
      <div className={contentClassName}>
        {type === "video" ? (
          <iframe
            className="responsive-iframe"  
            src="https://www.youtube.com/embed/Pq6ar4XuCPM"
            title="Viteo soitin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : 
        <div> {content}
        Sisältöluettelo:
          <br/>
          - Sivu 1: Pääsivu
          <br/>
          - Sivu 2: Tietoja sovelluksesta
          <br/>
          - Sivu 3: CV
          <br/>
          - Sivu 4: Robottitestaus video
        </div>
        }
        <br></br>
        <button className="button marginLeft" onClick={onClose}>Sulje</button>
      </div>
    </div>
  );
};

export default PopupWindow 