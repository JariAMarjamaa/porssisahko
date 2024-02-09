import { useEffect, useState } from 'react';
import React from 'react';

import LineChart from './LineChart';
import { ReadElectricityPriceData } from './ElectricityPrice.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Notication from "./noteHandling/note.jsx";

import PopupWindow    from './PopupWindow/Popup.jsx';
import DownloadButton from './Buttons/DonwloadingButton.jsx';

import './App.css';

function App() {
  const [priceData,    setPriceData]     = useState(null);
  const [priceOptions, setPriceOptions]  = useState(null);
  const [lowestValue,  setLowestValue]   = useState(0);
  const [highestValue, setHighestValue]  = useState(0);
  const [loading,      setLoadingValue]  = useState(true);

  const [state,        setState]         = useState(null);
  const [message,      setMessage]       = useState(null);

  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showInfoPopup,  setShowInfoPopup]  = useState(false);
  const [PopUpContent,   setPopUpContent]   = useState([]);

  var apiNotCalled = true;

  const openInfoPopup = (type) => {
    console.log("Open window: ", type);

    if (type === "info")
    {
      const newPopUpContent = "Jartsan opinnäytetyö \nDemoApp, kaikenlaisilla hienoilla kikkuloilla.\nKäytetyt kikkulat:\n-React\n-MaterialUI\n-Jest\n-Robot Framework\nVersio 3.2";
      setPopUpContent(newPopUpContent);
      setShowInfoPopup(true);
    }
    else
    {
      setShowVideoPopup(true);
    }
  };

  const handlePopupClose = (type) => {
    console.log("Close window: ", type);
    setShowInfoPopup(false);
    setPopUpContent(null); // Clear content when closing the popup
    setShowVideoPopup(false);
  };

  useEffect(() => {
    /*console.log("App. UseEffect"+
                "\n apiNotCalled: ", apiNotCalled, 
                "\n loading: ", loading+
                "\n state: ", state);*/

    const fetchData = async () => {
      try {
        const { priceData, priceOptions, respState, msg } = await ReadElectricityPriceData();

        if (respState !== null)
        {
          setLoadingValue(false);
          setState(respState);
          setMessage(msg);
        }

        if (priceData && priceData.datasets) {
          setLoadingValue(false);
        
          setPriceData(priceData);
          setPriceOptions(priceOptions);

          const values = priceData.datasets[0].data;
          setLowestValue(Math.min(...values));
          setHighestValue(Math.max(...values));

        } 
      } catch (error) {
        setState("error");
        setMessage(`Error fetching data: ${error}`);
      }
    };

    if (apiNotCalled)
    {
      console.log('App. Api not yet called => Call fetchData');
      apiNotCalled = false;
      setLoadingValue(true);
      fetchData();
    }
 
  }, []); // The empty dependency array ensures that the effect runs only once

  // Get the current date
  const currentDate = new Date();

  // Format the current date as DD.MM.YYYY
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  // Get the date 7 days ago
  const sevenDaysAgo = new Date(currentDate);
  const oneDayAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  oneDayAgo.setDate(currentDate.getDate() - 1);

  // Format the dates as DD.MM.YYYY
  const formattedSevenDaysAgo = `${sevenDaysAgo.getDate().toString().padStart(2, '0')}.${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}.${sevenDaysAgo.getFullYear()}`;
  const formattedOneDayAgo = `${oneDayAgo.getDate().toString().padStart(2, '0')}.${(oneDayAgo.getMonth() + 1).toString().padStart(2, '0')}.${oneDayAgo.getFullYear()}`;

  return (
    <div className="App">
      {<Notication type="warning" text="Käytetty Mockattu dataa"/>  }

      {/*Handle the error, e.g., show an error message to the user*/}
      {state !== null && <Notication type={state} text={String(message)}/>  }
      
      <header className="container">

        <div data-testid="RFW_MainPageText"><p>Pörssisähkökäppyrä harjoitus</p></div>

        <div> Päiväys: {formattedCurrentDate}</div>
        <div> Hae hinnat ajalta: {formattedSevenDaysAgo} - {formattedOneDayAgo}</div>

        <div className="price-info-and-buttons" data-testid="RFW_LowestHighestPrices">
          Halvin hinta on {lowestValue}
          <br/>
          Korkein hinta on {highestValue}
          <br/>
          <br/>
          <button className="button" onClick={() => openInfoPopup("info")}>Tietoja sovelluksesta</button>
          <br/>
          <button className="button" onClick={() => openInfoPopup("video")}>Katso video Robottitestauksesta</button>
          <br/>
          <DownloadButton />  
        </div>
        
        {showInfoPopup && <PopupWindow       onClose={() => handlePopupClose("info")} type="info" content={PopUpContent} />}

        {showVideoPopup && <PopupWindow      onClose={() => handlePopupClose("video")} type="video" content="" />} 
                
        <div className="separator"></div>

        {/* Check if priceData and priceOptions are available before rendering the LineChart */}
        {!loading && priceData && priceOptions && <LineChart data={priceData} options={priceOptions} />}

        {loading && <div className="overlay" >  <CircularProgress size={100}/> </div> }
      
      </header>
    </div>
  );
}

export default App;
