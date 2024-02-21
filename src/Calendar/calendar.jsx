import { React, useState } from 'react';
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

import dayjs from 'dayjs';
import 'dayjs/locale/fi';

import { getISOWeek, getISOWeekYear } from 'date-fns'; // /porssisahko/ npm install date-fns

// npm install @mui/x-date-pickers
// npm install dayjs

const Calendar = ({ dateSelected }) => {
    // Load the Finnish locale for dayjs
    dayjs.locale('fi');
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const lastSelectableDate = new Date('2023-01-01');

    // Count user made reguests
    const CACHE_KEY = 'userReguests';

    const [selectedDate,  setSelectedDate]  = useState(null);
    const [okSelected,    setOKSelected]    = useState(false);
    const [openDialog,    setDialogOpen]    = useState(false);

    const handleOpen = () => {
      // Handle calendar opening
      dateSelected(null);
      setOKSelected(false);
    };

    const handleDateChange = (date) => {
      // Handle date change
      const jsDate = date.toDate();
      const formatDate = new Date(jsDate);
      // Return date has time 00:00:00 which causes API to reduce 2 days in first round
      // Add 11hrs, so reducing works correctly.
      formatDate.setHours(formatDate.getHours() + 11);
      setSelectedDate(formatDate /*jsDate*/);
    };

    const shouldDisableDate = (day) => {
      //  return dayjs(day).isAfter(currentDate, 'day');
      const selectedDate = dayjs(day);
      return selectedDate.isAfter(currentDate, 'day') || selectedDate.isBefore(lastSelectableDate, 'day');
    };

    const handleCancel = () => {
      // Call the callback function in the calling component
      // cancel is always last to call from datepicker
    };

    const handleAccept = () => {
      var cacheDate = localStorage.getItem(CACHE_KEY);
      // Parse the cached data
      const cachedData = JSON.parse(cacheDate) || { count: 0, week: 0, year: 0 };
      const today = new Date();

      console.log("handleAccept. Tämä vuosi: ", getISOWeekYear(today));
      console.log("handleAccept. cache vuosi: ",cachedData.year);

      if (cachedData.count < 2 || getISOWeekYear(today) > cachedData.year) {
        // Update the cache and last request date
        setOKSelected(true);
      } else {
        //Request made twice already this week, hide button
        setOKSelected(false);
        setDialogOpen(true);
        setOKSelected(false);
      }
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    const handleSearch = () => {
      //trigger user date search
      const cacheDate = localStorage.getItem(CACHE_KEY);
      // Parse the cached data
      const cachedData = JSON.parse(cacheDate) || { count: 0, week: 0, year: 0 };

      //Laskee vuoden alusta?? startOfWeek(new Date(cachedData.year, 0, 1))
      const today = new Date();
    
      console.log("Calendar. handleSearch. cachedData : ", cachedData);
      console.log("Calendar. handleSearch. this week : ", getISOWeek(today));
    
      if (getISOWeek(today) !== cachedData.week || getISOWeekYear(today) > cachedData.year) {
        // New week, reset count
        cachedData.count = 0;
        console.log("Calendar. handleSearch. reset count to 0");
      }
    
      cachedData.count += 1;
      cachedData.week = getISOWeek(today);
      cachedData.year = getISOWeekYear(today);
  
      console.log("Calendar. handleSearch. updated cachedData : ",cachedData );

      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
      dateSelected(selectedDate);
      setOKSelected(false);
    };

    return (
      <div>
        <h2>Kalenteri</h2>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DatePicker
              defaultValue={dayjs(""+currentDate.getFullYear()+"-"+ (currentDate.getMonth()+1) +"-" +  currentDate.getDate())} 
              views={['year', 'month', 'day']}
              format="DD/MM/YYYY"
              //value={selectedDate}
              onChange={handleDateChange}
              onAccept={handleAccept}
              onClose={handleCancel}
              onOpen={handleOpen}
              localeText={{ datePickerToolbarTitle: 'Valittu päivä', cancelButtonLabel: 'Peruuta', }}
              shouldDisableDate={shouldDisableDate}
              slotProps={{
                textField: {
                    readOnly: true,
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
              TransitionComponent={Slide}
              keepMounted
              onClose={handleDialogClose}
              aria-describedby="alert-dialog-slide-description" >
              <DialogTitle>{"Hakukerrat!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Haku kerrat on rajoitettu 2 viikossa
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>JEP</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    );
};

export default Calendar;