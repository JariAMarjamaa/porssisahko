import { React, useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button     from '@mui/material/Button';
import Slide      from '@mui/material/Slide';

import Dialog             from '@mui/material/Dialog';
import DialogActions      from '@mui/material/DialogActions';
import DialogContent      from '@mui/material/DialogContent';
import DialogContentText  from '@mui/material/DialogContentText';
import DialogTitle        from '@mui/material/DialogTitle';

import { maxRequestMade, maxRequestMadeUpdate } from '../content/text_content';

import { formatDate }  from '../helpers/stringFormating';

import dayjs from 'dayjs';
import 'dayjs/locale/fi';

import { getISOWeek, getISOWeekYear } from 'date-fns'; 

// npm install date-fns
// npm install @mui/x-date-pickers
// npm install dayjs

const Calendar = ({ dateSelected, UpdateChart }) => {
    // Load the Finnish locale for dayjs
    dayjs.locale('fi');
    const today = new Date();
    const yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate()/* - 1*/);
    const lastSelectableDate = new Date('2023-01-01');

    // Count user made reguests
    const CACHE_KEY      = 'userReguests';
    const CACHE_KEY_DATA = 'electricity_price_cache';

    const [selectedDate,  setSelectedDate]  = useState(yesterDay/*null*/);
    const [value,         setValue]         = useState(dayjs(""+yesterDay.getFullYear()+"-"+ (yesterDay.getMonth()+1) +"-" +  yesterDay.getDate()) );
    const [okSelected,    setOKSelected]    = useState(false);
    const [openDialog,    setDialogOpen]    = useState(false);
    const [show2button,   setshow2button]   = useState(true);

    //Reseting user date selection
    const [resetDate,     setResetDate]    = useState(false);
    const [resetDateKey,  setResetDateKey] = useState(0);

    useEffect(() => {
      if (resetDate) {
        //console.log("Calendar. useEffect. resetDate ");
        setValue( dayjs(""+yesterDay.getFullYear()+"-"+ (yesterDay.getMonth()+1) +"-" + yesterDay.getDate()) );
        setSelectedDate(yesterDay);
        setResetDate(false); // prevent infinite loop
        setResetDateKey((prevKey) => prevKey + 1); // force DatePicker to remount
      }
    }, [resetDate, yesterDay]);

    const handleOpen = () => {
      // Handle calendar opening
      //dateSelected(null);
      setOKSelected(false);
      setDialogOpen(false);
    };

    const handleDateChange = (date) => {
      // Handle date change
      const jsDate = date.toDate();
      const formatDate = new Date(jsDate);
      // Return date has time 00:00:00 which causes API to reduce 2 days in first round
      // Add 11hrs, so reducing works correctly.
      //console.log("Calendar. handleDateChange. formatDate: ", formatDate);

      formatDate.setHours(formatDate.getHours() + 11);
      setSelectedDate(formatDate);
    };

    const shouldDisableDate = (day) => {
      const selectedDate = dayjs(day);
      return selectedDate.isAfter(yesterDay, 'day') || selectedDate.isBefore(lastSelectableDate, 'day');
    };

    const handleCancel = () => {
      // Call the callback function in the calling component
      // cancel is always last to call from datepicker
    };

    const handleAccept = (value) => {
      var cacheDate = localStorage.getItem(CACHE_KEY);
      // Parse the cached data
      const cachedData = JSON.parse(cacheDate) || { count: 0, week: 0, year: 0 };

      //console.log("Calendar. handleAccept. CACHE_KEY: ", cachedData);

      if (cachedData.count < 2 || getISOWeekYear(today) > cachedData.year) {
        // Update the cache and last request date
        //console.log("Calendar. handleAccept. OK. Update cache");

        setOKSelected(true);
      } else {
        //Request made twice already this week, hide search button
        setOKSelected(false);

        today.toDateString();
        var cachedPriceData = localStorage.getItem(CACHE_KEY_DATA);

        //console.log("Calendar. handleAccept. FAIL. 2 request already made."+ 
        //"\n CACHE_KEY_DATA: ", JSON.parse(cachedPriceData),
        //"\n Show info dialog");

        if (cachedPriceData) {
          let cachedPrices = JSON.parse(cachedPriceData); 
          const lastItem = cachedPrices.data[cachedPrices.data.length - 1].aikaleima_suomi ;
         
          // Check if the data is already latest
          if (formatDate(yesterDay) === formatDate (lastItem) /*&& cachedPrices.userRequest === "FALSE"*/) {
            setshow2button(false);
          }
          else
          {
            setshow2button(true);
          }
        }
        else {
          console.error("Calendar. Price cache null!!");
        }
       setDialogOpen(true);
      }
    };

    const handleDialogClose = (action) => {
      //console.log("Calendar. handleDialogClose: ", action);
      
      setDialogOpen(false);
      setResetDate(true);
      if (action === "CloseAndUpdate")
      {
        UpdateChart();
      }
    };

    const handleSearch = () => {
      //console.log("Calendar. handleSearch. selectedDate: ", selectedDate);

      //trigger user date search
      const cacheDate = localStorage.getItem(CACHE_KEY);

      // Parse the cached data
      const cachedData = JSON.parse(cacheDate) || { count: 0, week: 0, year: 0 };

      //console.log("Calendar. handleSearch. Read achedData: ", cachedData);

      //Laskee vuoden alusta?? startOfWeek(new Date(cachedData.year, 0, 1))
      const today = new Date();
    
      //console.log("Calendar. handleSearch. cachedData : ", cachedData);
      //console.log("Calendar. handleSearch. this week : ", getISOWeek(today));
    
      if (getISOWeek(today) !== cachedData.week || getISOWeekYear(today) > cachedData.year) {
        // New week, reset count
        cachedData.count = 0;
        //console.log("Calendar. handleSearch. reset count to 0");
      }
    
      cachedData.count += 1;
      cachedData.week = getISOWeek(today);
      cachedData.year = getISOWeekYear(today);
  
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));

      dateSelected(selectedDate);
      setOKSelected(false);
    };

    return (
      <div>
        <h2>Kalenteri</h2>
        <div data-testid="RFW_CalendarTitle">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DatePicker
              //name = "RFW_DatePickerInputName"
              key={resetDateKey}
              views={['year', 'month', 'day']}
              format="DD/MM/YYYY"
              label="Valitse päätöspäivä" 
              value={value}
              onChange={handleDateChange}
              onAccept={handleAccept}
              //onAccept={() => {}}
              onClose={handleCancel}
              onOpen={handleOpen}
              localeText={{ datePickerToolbarTitle: 'Valittu päivä', 
                            previousMonth: 'Edellinen kuukausi',
                            nextMonth: 'Seuraava kuukausi',              
                            cancelButtonLabel: 'Peruuta',
                            todayButtonLabel: "Valitse eilinen päivä" }}
              shouldDisableDate={shouldDisableDate}
              closeOnSelect={false} // estä auto ok-selection
              slotProps={{
                actionBar: {
                  // The actions will be the same between desktop and mobile
                  actions: ["cancel", "accept"] // "today", "clear"
              },
               
              textField: {
                    readOnly: true,
                    //id: 'RFW_DatePickerInputSlotProp',
                    inputProps: {
                      "data-testid": "RFW_DatePickerInputID"
                  }
                },
              }}
              //readOnly
              //disabled
              //openTo= 'day' | 'month'  | 'year'"year"
              //orientation	'landscape' | 'portrait'
            />
          </LocalizationProvider>
          <br></br>
          {okSelected && <button className="date-button" onClick={handleSearch}>Hae hinnat</button>}
          
          <br></br>
          <div>
            <Dialog
              open={openDialog}
              data-testid="RFW_CaleandarDialog"
              TransitionComponent={Slide}
              keepMounted
              onClose={handleDialogClose}
              aria-describedby="alert-dialog-slide-description" >
              <DialogTitle>{"Hakukerrat!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" data-testid="RFW_CaleandarDialogContent">
                  {show2button ? maxRequestMadeUpdate : maxRequestMade}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogClose("Close")}>Asia pihvi</Button>
                {show2button && <Button onClick={() => handleDialogClose("CloseAndUpdate")}>Haluan päivittää käppyrän</Button>}
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    );
};

export default Calendar;