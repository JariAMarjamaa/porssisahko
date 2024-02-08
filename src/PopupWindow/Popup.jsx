import React from 'react';
import './Popup.css';


const PopupWindow = ({ onClose, type, content }) => {
    const contentClassName = `content ${type}-content`;

    return (
    <div className="Popup-container">
      <div className={contentClassName}>
        {type === "video" ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Pq6ar4XuCPM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ) : 
        <div> {content} </div>
        }
        <br></br>
        <button className="button" onClick={onClose}>Sulje</button>
      </div>
    </div>
  );
};

export default PopupWindow 