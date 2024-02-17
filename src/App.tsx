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

  const [openSnackbar,  setSnackbarOpen]   = useState(false);

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

  var apiNotCalled = true;

  useEffect(() => {
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

  // Callback function to receive the value from the subcomponent
  const handleSelectedDate = (date) => {
    if (date !== null)
    {
      const day   = date.date();
      const month = date.month() + 1; // Month is zero-based, so add 1
      const year  = date.year();
      console.log('APP. Valinta. Day:', day, "-Month:", month, "-Year: ", year);
    }
  };

  const handleOKSelection = (value) => {
    console.log('APP. handleOKSelection:', value);
    setSelection(value);
    setSelectionText(value === true ? "OK klikattu" : "Eiku en valitsekkaan");
  
  };

  return (
    <div className="App">
      {<Notication type="warning" text="Käytetään Pörssisähko.net:n tarjoamaan tietoa"/>  }

      {/*Handle the error, e.g., show an error message to the user*/}
      {state !== "" && <Notication type={state} text={String(message)}/>  }
      
      <div className="container">

        <div data-testid="RFW_MainPageText"><p>Pörssisähkökäppyrä harjoitus</p></div>

        <div> Päiväys: {formattedCurrentDate}</div>
        <div> Hae hinnat ajalta: {formattedSevenDaysAgo} - {formattedOneDayAgo}</div>

        <div className="price-info" data-testid="RFW_LowestHighestPrices">
          Halvin hinta on {lowestValue}
          <br/>
          Korkein hinta on {highestValue}
          <br/>
          <br/>
        </div>

        <div className="calendar">
          <Calendar dateSelected={handleSelectedDate} setOKSelected={handleOKSelection}></Calendar>
          {selectionText}
          <br></br>
          {selection && <button className="date-button" /*onClick={handleDownload}*/>Hae hinnat</button>}
          <div>
            <Button onClick={handleSnackbarClick}>Kalenteri ohje</Button>
            <Snackbar
              TransitionComponent={Slide}
              ContentProps={{
                sx: {
                  background: "green"
                }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot"
              action={action} />
          </div>
        </div>

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
              
        <div className={`table-of-contents ${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`}>
          Sisältöluettelo:
          <br/>
          - Sivu 1: Pääsivu
          <br/>
          - Sivu 2: Tietoja sovelluksesta
          <br/>
          - Sivu 3: CV
          <br/>
          - Sivu 4: Robottitestaus video
          <br/>
          + uusi ihana kalenteri
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
