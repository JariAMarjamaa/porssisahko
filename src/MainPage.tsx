import { useEffect, useState } from 'react';
import * as React from 'react';

import LineChart from './LineChart.js';
import { ReadElectricityPriceData } from './ElectricityPrice.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Notication from "./noteHandling/note.jsx";

import SecondPage  from './Pages/2Page.tsx';
import ThirdPage   from './Pages/3Page.jsx';
import FourthPage  from './Pages/4Page.jsx';
import FifthPage   from './Pages/5Page.jsx';

import Calendar    from './Calendar/calendar.jsx';
import ButtonList  from './Buttons/ButtonList.jsx';

//import Typography from '@mui/material/Typography';
import Pagination   from '@mui/material/Pagination';
import Stack        from '@mui/material/Stack';

import PopupWindow  from './PopupWindow/Popup.jsx';

import { info, PriceRequestFail } from './content/text_content.jsx';

import ChartSwitch from './Switch/switch.tsx';

import './App.css';

function MainPage({handleLogOut}) {
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

  const [SystemFailure, setSystemFailure]  = useState(false);

  const [chartType,     setChartType]      = useState('LineChartSelected');

  const [buttonListVisible, setButtonListVisible] = useState(false);
  const [buttonVisibleText, setButtonVisibleText] = useState("Näytä nappulat");

  const toggleButtonList = () => {
    setButtonListVisible(!buttonListVisible);
    setButtonVisibleText(buttonListVisible ? "Näytä nappulat" : "Piilota nappulat");
  };

  const handleOpenNewPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setShowPage(value);
  };

  const handleCloseNewPage = () => {
    setShowPage(1);
  };

  const closePopup = () => {
    setSystemFailure(false);
  }

  var apiNotCalled = true
  const currentDate = new Date();
  // Title. Format the current date as DD.MM.YYYY
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  //Data requestit
  const fetchData = async (date: Date, userRequest: string) => {
    
    setLoadingValue(true);
    try {
      const { priceData, priceOptions, respState, msg } = await ReadElectricityPriceData(date, userRequest);
      setLoadingValue(false);

      if (respState === "error")
      {
        setSystemFailure(true);
      }
      else if (respState !== null)
      {
        setSystemFailure(false);
        setState(respState);
        setMessage(msg);
      }

      if (priceData && priceData.datasets) {
        setPriceData(priceData);
        setPriceOptions(priceOptions);

        const values = priceData.datasets[0].data;
        setLowestValue(Math.min(...values));
        setHighestValue(Math.max(...values));
        
        createTitleText(priceOptions.scales.x.labels);
      } 
    } catch (error) {
      setState("error");
      setMessage(`Error fetching data: ${error}`);
    }
  };

  const createTitleText = (dateLabels: any /* date: Date*/) => {
    // Extract the dates from the first and last items
    const startDate = dateLabels[0].split(" - ")[0];
    //lue end date toiseksi viimeisestä itemistä, koska alle 600px joka toinen tyhjä,
    //jotta kalenterin lukeminen on selvempää
    const endDate = dateLabels[dateLabels.length - 2].split(" - ")[0];

    // Create the title
    setTimeSpanText(`${startDate} - ${endDate}`);
  };

  //INIT request
  useEffect(() => {
    if (apiNotCalled) {
      apiNotCalled = false;
      //console.log("APP useEffect. Hae initti");
      fetchData(currentDate, "FALSE");
    }
  }, []); // The empty dependency array ensures that the effect runs only once
  
  useEffect(() => {
    if (makeRequest === "USER") {
      // Trigger user selection search
      setMakeRequest("");
      selectedDate.setDate(selectedDate.getDate() + 1);
      //console.log("APP useEffect. käyttäjän valinta");

      // päivän lisäys jo effektinä, joten samat kuin initissä
      //API vähentää oletuksena päivän, defautti toiminto.
      //Joten lisää päivä käyttäjän valintaan
      fetchData(selectedDate, "TRUE");
    }
  }, [makeRequest, selectedDate, fetchData]); // Fetch data when makeRequest or selectedDate changes
  
  // Callback function to receive the value from the subcomponent
  const handleSelectedDate = (date: Date) => {
    //console.log("APP. handleSelectedDate. ", date);
    if (date !== null)
    {
      setSelectedDate(date);
      setMakeRequest("USER");
    }
  };

  const updateChartDefaultData = () => {
    //console.log("APP. updateChartDefaultData");
    fetchData(currentDate, "RESET");
  }

  const makeSimulatoinFailReq = (status) => {
    fetchData(currentDate, "PörssiFailSimulaatio");
  };

  const handleSwitchChange = () => {
    setChartType((prevChartType) =>
      prevChartType === 'LineChartSelected' ? 'BarChartSelected' : 'LineChartSelected'
    );
  };

  //useEffect(() => {
  // console.log("APP. handleSwitchChange. chartType: ", chartType);
  //}, [chartType]);

  return (
    <div>
      {<Notication type="warning" text={info}/>  }

      {/*Handle the error, e.g., show an error message to the user*/}
      {state !== "" && <Notication type={state} text={String(message)}/>  }
      
      <div className="container">

        {SystemFailure ?
          <PopupWindow onClose={closePopup} type="error-text" content={PriceRequestFail}></PopupWindow>
        :
        <div>
        <br></br>
        <div> Päiväys: {formattedCurrentDate}</div>
        <div> Hinnat ajalta: {timeSpan} </div>

        {!loading && showPage === 1 &&
        <div  className={`calendar ${buttonListVisible ? 'hidden' : ''}`}>
          <Calendar dateSelected={handleSelectedDate} UpdateChart={updateChartDefaultData}></Calendar>
        </div>
        }

        {!loading && showPage === 1 && 
        <div className={`switch ${buttonListVisible ? 'buttonlistVisible' : ''}`}>
          <ChartSwitch switchChanged={handleSwitchChange}></ChartSwitch>
        </div>
        }

        {!loading && showPage === 1 &&
        <div>
          <button className="button mainButton" onClick={toggleButtonList}>{buttonVisibleText}</button>

          <div className={`buttonList ${buttonListVisible ? 'visible' : ''}`}>
            <ButtonList lowestPrice={lowestValue} highestPrice={highestValue} simulationCallback={makeSimulatoinFailReq} logOut={handleLogOut}></ButtonList>
          </div>
        </div>
        }

        {/* Check if priceData and priceOptions are available before rendering the LineChart */}
        {!loading && priceData && priceOptions && <LineChart type={chartType} data={priceData} options={priceOptions} />}

        {loading && <div className="overlay">  <CircularProgress size={100}/> </div> }

        {showPage === 2 ? 
          <div>
            <SecondPage />
          </div>
         : showPage === 3 ? 
          <div>
            <ThirdPage onClose={handleCloseNewPage} />
          </div>
         : showPage === 4 ? 
         <div>
           <FourthPage />
         </div>
         : showPage === 5 && 
         <div>
            <FifthPage />
          </div>
        }
 
        <br></br>

        {/* hideTableOfContents sitä varten, että jos osio avataan sivulta 2, niin aukinainen sisällysluettelo piiloitetaan*/}
        {/* className={`${showPage === 1 ? 'white-text' : 'other-than-main-page'} ${hideTableOfContents ? 'hidden' : ''}`} */}
          
        <div className="pagination">
          <Stack spacing={2} alignItems="center">
            <Pagination color="primary" count={5} page={showPage} onChange={handleOpenNewPage}/>
          </Stack>
        </div>
        </div>
    }
    </div>
    </div>
  );
}

export default MainPage;
