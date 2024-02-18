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

import Button     from '@mui/material/Button';
import Snackbar   from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon  from '@mui/icons-material/Close';
import Slide      from '@mui/material/Slide';

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

  const [selection,     setSelection]      = useState(false);
  const [selectionText, setSelectionText]  = useState("");
  const [selectedDate,  setSelectedDate]   = useState(new Date());
  const [requestsMadeToday, setRequestsMadeToday] = useState(0);
  const [makeRequest,   setMakeRequest]     = useState("");

  const [timeSpan,      setTimeSpanText]   = useState("");

  const [openSnackbar,   setSnackbarOpen]   = useState(false);
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

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      {/*<Button color="error" size="small" onClick={handleSnackbarClose}>
        EIKU
        </Button>*/}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  var apiNotCalled = true
  const currentDate = new Date();

  // Get the date 7 days ago
  var sevenDaysAgo = new Date();
  var oneDayAgo = new Date();

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

  //INIT request
  useEffect(() => {
    if (apiNotCalled) {
      apiNotCalled = false;
      console.log("APP useEffect. Hae initti");
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      oneDayAgo.setDate(currentDate.getDate() - 1);
      // Format the dates as DD.MM.YYYY
      const formattedSevenDaysAgo = `${sevenDaysAgo.getDate().toString().padStart(2, '0')}.${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}.${sevenDaysAgo.getFullYear()}`;
      const formattedOneDayAgo = `${oneDayAgo.getDate().toString().padStart(2, '0')}.${(oneDayAgo.getMonth() + 1).toString().padStart(2, '0')}.${oneDayAgo.getFullYear()}`;
      setTimeSpanText(formattedSevenDaysAgo + "-" + formattedOneDayAgo);
      fetchData(currentDate, false);
    }
  }, []); // The empty dependency array ensures that the effect runs only once
  
  useEffect(() => {
    if (makeRequest === "USER") {
      // Trigger user selection search
      console.log("APP useEffect. käyttäjän valinta valittu")

      sevenDaysAgo.setDate(selectedDate.getDate() - 6);
      oneDayAgo.setDate(selectedDate.getDate());
      const formattedSevenDaysAgo = `${sevenDaysAgo.getDate().toString().padStart(2, '0')}.${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}.${sevenDaysAgo.getFullYear()}`;
      const formattedOneDayAgo = `${oneDayAgo.getDate().toString().padStart(2, '0')}.${(oneDayAgo.getMonth() + 1).toString().padStart(2, '0')}.${oneDayAgo.getFullYear()}`;
      setTimeSpanText(formattedSevenDaysAgo + "-" + formattedOneDayAgo);
      
      //API vähentää oletuksena päivän, defautti toiminto.
      //Joten lisää päivä käyttäjän valintaan
      selectedDate.setDate(selectedDate.getDate() + 1);
      console.log("APP useEffect. selectedDate: ", selectedDate);

      fetchData(selectedDate, true);
    }
  }, [makeRequest, selectedDate]); // Fetch data when makeRequest or selectedDate changes
  
  useEffect(() => {
    // Check and reset requestsMadeToday when the date changes
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('lastRequestDate');

    if (storedDate !== today) {
      localStorage.setItem('lastRequestDate', today);
      setRequestsMadeToday(0);
    }
  }, []);

  // Format the current date as DD.MM.YYYY
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  // Callback function to receive the value from the subcomponent
  const handleSelectedDate = (date: Date) => {
    console.log("APP. handleSelectedDate. ", date);
    if (date !== null)
    {
      setSelectedDate(date);
    }
  };

  const handleOKSelection = (value: boolean) => {
    /*console.log("APP. handleOKSelection. ", value, 
                "\n requestsMadeToday: ", requestsMadeToday,
                "\n makeRequest: ", makeRequest);*/

    setSelection(value);
    setMakeRequest("");
    setSelectionText(value === true ? "OK klikattu" : "Eiku en valitsekkaan");

    /*if (requestsMadeToday < 2) {
      setSelectionText(value === true ? "OK klikattu" : "Eiku en valitsekkaan");
    } else*/ if (value && requestsMadeToday === 2) {
      setSelectionText("Haku kerrat on rajoitettu 2 per päivä");
      //alert("Haku kerrat on rajoitettu 2 per päivä. Yritä huomenna uudestaan.");
      //Request made twice already, hide button
      setSelection(false);
    }
  };

  const handleSearch = () => {
    console.log("APP. handleSearch");
    setSelection(false);
    setRequestsMadeToday(requestsMadeToday + 1);
    //trigger user date search
    setMakeRequest("USER");
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
          <Calendar dateSelected={handleSelectedDate} setOKSelected={handleOKSelection}></Calendar>
          {selectionText}
          <br></br>
          {selection && <button className="date-button" onClick={handleSearch}>Hae hinnat</button>}
          <div>
            <Button onClick={handleSnackbarClick}>Kalenteri ohje</Button>
            <Snackbar
              TransitionComponent={Slide}
              ContentProps={{
                sx: {
                  background: "green",
                  width: '100%',
                  height: 'auto', lineHeight: '28px'  //whiteSpace: "pre-wrap"
                }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot. Vain max. 2 hakua päivässä"
              action={action} />
          </div>
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
        <div className={`${showPage === 1 ? 'white-text' : 'other-than-main-page'}`}> 
        <button className="button"  onClick={() => openPopupWindow("teksti")}>Avaa Sisällysluettelo</button>
        </div>}

        <div className={`table-of-contents ${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`}>
          {showPopup && <PopupWindow  onClose={() => handlePopupClose("teksti")} type="teksti" content="" />} 
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
