import { useEffect, useState } from 'react';
import * as React from 'react';

import LineChart from './LineChart.js';
import { ReadElectricityPriceData } from './ElectricityPrice.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Notication from "./noteHandling/note.jsx";

import SecondPage  from './Pages/2Page.tsx';
import ThirdPage   from './Pages/3Page.jsx';
import FourthPage  from './Pages/4Page.jsx';
import Calendar    from './Calendar/calendar.jsx';
import ButtonList  from './Buttons/ButtonList.jsx';

//import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { info } from './content/text_content.jsx';

import './App.css';

function App() {
  const [priceData,    setPriceData]     = useState(null);
  const [priceOptions, setPriceOptions]  = useState(null);
  const [lowestValue,  setLowestValue]   = useState(0);
  const [highestValue, setHighestValue]  = useState(0);
  const [loading,      setLoadingValue]  = useState(true);

  const [state,        setState]         = useState("");
  const [message,      setMessage]       = useState("");
  const [showPage,     setShowPage]      = useState(1);

  const [selectedDate,  setSelectedDate]   = useState(new Date());
  const [makeRequest,   setMakeRequest]    = useState("");

  const [timeSpan,      setTimeSpanText]   = useState("");

  const handleOpenNewPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setShowPage(value);
  };

  const handleCloseNewPage = () => {
    setShowPage(1);
  };

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
      {<Notication type="warning" text={info}/>  }

      {/*Handle the error, e.g., show an error message to the user*/}
      {state !== "" && <Notication type={state} text={String(message)}/>  }
      
      <div className="container">

        <p data-testid="RFW_MainPageText ">Pörssisähkökäppyrä harjoitus</p>

        <div> Päiväys: {formattedCurrentDate}</div>
        <div> Hae hinnat ajalta: {timeSpan} </div>

        {!loading &&
        <div className="calendar">
          <Calendar dateSelected={handleSelectedDate}></Calendar>
        </div>
        }

        {!loading && showPage === 1 &&
        <div className="buttonList">
          <ButtonList lowestPrice={lowestValue} highestPrice={highestValue} ></ButtonList>
        </div>
        }

        {/* Check if priceData and priceOptions are available before rendering the LineChart */}
        {!loading && priceData && priceOptions && <LineChart data={priceData} options={priceOptions} />}

        {loading && <div className="overlay" >  <CircularProgress size={100}/> </div> }

        {showPage === 2 ? 
          <div>
            <SecondPage />
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

        {/* hideTableOfContents sitä varten, että jos osio avataan sivulta 2, niin aukinainen sisällysluettelo piiloitetaan*/}
        {/* className={`${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`} */}
          
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
