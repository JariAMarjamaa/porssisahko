import { useEffect, useState } from 'react';
import * as React from 'react';

import LineChart from './LineChart.js';
import { ReadElectricityPriceData } from './ElectricityPrice.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Notication from "./noteHandling/note.jsx";

import SecondPage from './Pages/2Page.tsx';
import ThirdPage  from './Pages/3Page.jsx';
import FourthPage from './Pages/4Page.jsx';
import Calendar   from './Calendar/calendar.jsx';
import PopupWindow from './PopupWindow/Popup.jsx';

//import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './App.css';

function App() {
  const [priceData,    setPriceData]     = useState(null);
  const [priceOptions, setPriceOptions]  = useState(null);
  const [lowestValue,  setLowestValue]   = useState(0);
  const [highestValue, setHighestValue]  = useState(0);
  const [loading,      setLoadingValue]  = useState(true);

  const [hideTableOfContents, setTableOfContentHide]  = useState(false);

  const [state,        setState]         = useState("");
  const [message,      setMessage]       = useState("");
  const [showPage,     setShowPage]      = useState(1);

  const [selectedDate,  setSelectedDate]   = useState(new Date());
  const [makeRequest,   setMakeRequest]    = useState("");

  const [timeSpan,      setTimeSpanText]   = useState("");

  const [showPopup,      setShowPopup]      = useState(false);

  const openPopupWindow = (type) => {
    setShowPopup(true);
  };

  const handlePopupClose = (type) => {
    setShowPopup(false);
  };
  const handleOpenNewPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setShowPage(value);
  };

  const handleAccordion = (state) => {
    setTableOfContentHide(state);
  }
  const handleCloseNewPage = () => {
    setShowPage(1);
  };

  const toc = (
    <div>
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
  );

  var apiNotCalled = true
  const currentDate = new Date();
  // Title. Format the current date as DD.MM.YYYY
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  //Data requestit
  const fetchData = async (date: Date, userRequest: boolean) => {
    setLoadingValue(true);
    try {
      const { priceData, priceOptions, respState, msg } = await ReadElectricityPriceData(date, userRequest);
      setLoadingValue(false);

      if (respState !== null)
      {
        setState(respState);
        setMessage(msg);
      }

      if (priceData && priceData.datasets) {
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

  const createTitleText = (date: Date, seven: number, one: number) => {
    //console.log("createTitleText. date: ", date );
    // Get the date 7 days ago
    var start = new Date();
    var end = new Date();

    start.setDate(date.getDate() - 7);
    end.setDate(date.getDate() - 1);

    // Format the dates as DD.MM.YYYY
    const formattedStart = `${start.getDate().toString().padStart(2, '0')}.${(start.getMonth() + 1).toString().padStart(2, '0')}.${start.getFullYear()}`;
    const formattedEnd   = `${end.getDate().toString().padStart(2, '0')}.${(end.getMonth() + 1).toString().padStart(2, '0')}.${end.getFullYear()}`;

    //console.log("=> ", formattedStart + "-" + formattedEnd);
    setTimeSpanText(formattedStart + "-" + formattedEnd);
  };

  //INIT request
  useEffect(() => {
    if (apiNotCalled) {
      apiNotCalled = false;
      console.log("APP useEffect. Hae initti");
      createTitleText(currentDate, 7, 1);
      fetchData(currentDate, false);
    }
  }, []); // The empty dependency array ensures that the effect runs only once
  
  useEffect(() => {
    if (makeRequest === "USER") {
      // Trigger user selection search
      setMakeRequest("");
      selectedDate.setDate(selectedDate.getDate() + 1);
      console.log("APP useEffect. käyttäjän valinta");

      // päivän lisäys jo effektinä, joten samat kuin initissä
      createTitleText(selectedDate, 7, 1);
      //API vähentää oletuksena päivän, defautti toiminto.
      //Joten lisää päivä käyttäjän valintaan
      fetchData(selectedDate, true);
    }
  }, [makeRequest, selectedDate]); // Fetch data when makeRequest or selectedDate changes
  
  // Callback function to receive the value from the subcomponent
  const handleSelectedDate = (date: Date) => {
    //console.log("APP. handleSelectedDate. ", date);
    if (date !== null)
    {
      setSelectedDate(date);
      setMakeRequest("USER");
    }
  };

  return (
    <div className="App">
      {<Notication type="warning" text="Käytetään Testidataa, kunnes Kalenterin käyttö korjattu!"/*"Käytetään Pörssisähko.net:n tarjoamaan tietoa"*//>  }

      {/*Handle the error, e.g., show an error message to the user*/}
      {state !== "" && <Notication type={state} text={String(message)}/>  }
      
      <div className="container">

        <div data-testid="RFW_MainPageText"><p>Pörssisähkökäppyrä harjoitus</p></div>

        <div> Päiväys: {formattedCurrentDate}</div>
        <div> Hae hinnat ajalta: {timeSpan} </div>

        <div className="price-info" data-testid="RFW_LowestHighestPrices">
          Halvin hinta on {lowestValue}
          <br/>
          Korkein hinta on {highestValue}
          <br/>
          <br/>
        </div>

        {!loading &&
        <div className="calendar">
          <Calendar dateSelected={handleSelectedDate}></Calendar>
        </div>
        }

        {/* Check if priceData and priceOptions are available before rendering the LineChart */}
        {!loading && priceData && priceOptions && <LineChart data={priceData} options={priceOptions} />}

        {loading && <div className="overlay" >  <CircularProgress size={100}/> </div> }

        {showPage === 2 ? 
          <div>
            <SecondPage onOpen={(state) => handleAccordion(state)} />
          </div>
         : showPage === 3 ? 
          <div>
            <ThirdPage onClose={handleCloseNewPage} />
          </div>
         : showPage === 4 && 
         <div>
           <FourthPage />
         </div>
        }
 
        <br></br>
        {!showPopup && 
        <div className={`${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`}> 
        <button className="button"  onClick={() => openPopupWindow("teksti")}>Avaa Sisällysluettelo</button>
        </div>}

        {/*hideTableOfContents sitä varten, että jos osio avataan sivulta 2, niin aukinainen sisällysluettelo piiloitetaan*/}
        <div className={`${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`}>
          {showPopup && <PopupWindow  onClose={() => handlePopupClose("toc")} type="toc" content={toc} />} 
        </div>
          
        <div className="pagination">
          <Stack spacing={2} alignItems="center">
            <Pagination color="primary" count={4} page={showPage} onChange={handleOpenNewPage}/>
          </Stack>
        </div>

      </div>
    </div>
  );
}

export default App;
