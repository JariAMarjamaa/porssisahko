import React from 'react';
import './Popup.css';

import ExcelDownload   from '../ExcelDonwloading/exportToExcel.jsx';


const PopupWindow = ({ onClose, type, content }) => {
    const contentClassName = `${type}-popup`;
    //console.log("contentClassName: ", contentClassName);

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
        ) : type === "excelDownload" ?
          <div> <ExcelDownload></ExcelDownload> </div>
          : 
          <div> {content}</div>
        }
        <br></br>
        <button className="button" onClick={onClose}>Sulje</button>
      </div>
    </div>
  );
};

export default PopupWindow 

