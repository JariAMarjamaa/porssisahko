import { React, useState, useEffect, Fragment } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button     from '@mui/material/Button';
import Snackbar   from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon  from '@mui/icons-material/Close';
import Slide      from '@mui/material/Slide';

import dayjs from 'dayjs';
import 'dayjs/locale/fi';

// npm install @mui/x-date-pickers
// npm install dayjs

const Calendar = ({ dateSelected }) => {
    // Load the Finnish locale for dayjs
    dayjs.locale('fi');
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const lastSelectableDate = new Date('2023-01-01');

    const [selectedDate,      setSelectedDate]      = useState(null);
    const [selectionText,     setSelectionText]     = useState(null);
    const [okSelected,        setOKSelected]        = useState(false);
    const [cancelSelected,    setCancelSelected]    = useState(false);
    const [requestsMadeToday, setRequestsMadeToday] = useState(0);

    const [openSnackbar,   setSnackbarOpen]   = useState(false);

    useEffect(() => {
      // Check and reset requestsMadeToday when the date changes
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('lastRequestDate');
  
      if (storedDate !== today) {
        localStorage.setItem('lastRequestDate', today);
        setRequestsMadeToday(0);
      }
    }, []);

    useEffect(() => {
      console.log("Calendar: Effect. okSelected: ",     okSelected);
      console.log("Calendar: Effect. cancelSelected: ", cancelSelected);
      console.log("Calendar: Effect. selectedDate: ",   selectedDate);
      if (!okSelected && cancelSelected)
      {
        setSelectionText("Eiku en valitsekkaan");
      }
      else{
        dateSelected(selectedDate);
      }
    }, [selectedDate, okSelected, cancelSelected]);

    const handleSnackbarClick = () => {
      setSnackbarOpen(true);
    };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    const calendarInfo = (
      <div>
      Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot.
      <br/>
      Vain max. 2 hakua päivässä
      </div>
    );

    const action = (
      <Fragment>
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
      </Fragment>
    );

    const handleOpen = () => {
      // Handle calendar opening
      dateSelected(null);
      setOKSelected(false);
      setSelectionText(null);
    };

    const handleDateChange = (date) => {
      // Handle date change
      // Get selected day, month, and year as separate variables
      //const formattedDate = dayjs(date).format('DD/MM/YYYY');
      const jsDate = date.toDate();
      console.log("Calendar: handleDateChange. jsDate: ", jsDate);
      setSelectedDate(jsDate /*formattedDate*/);
    };

    const shouldDisableDate = (day) => {
      //  return dayjs(day).isAfter(currentDate, 'day');
      const selectedDate = dayjs(day);
      return selectedDate.isAfter(currentDate, 'day') || selectedDate.isBefore(lastSelectableDate, 'day');
    };

    const handleCancel = () => {
      // Handle cancel button press
      // Call the callback function in the calling component
      // cancel is always last to call from datepicker
      setCancelSelected(true);
    };

    const handleAccept = () => {
      // Handle cancel button press
      console.log("Calendar: handleAccept");
      setSelectionText("OK klikattu" /*: "Eiku en valitsekkaan"*/);
      setOKSelected(true);
      if (requestsMadeToday === 2) {
        //alert("Haku kerrat on rajoitettu 2 per päivä. Yritä huomenna uudestaan.");
        //Request made twice already, hide button
        setOKSelected(false);
        setSelectionText("Haku kerrat on rajoitettu 2 per päivä");
      }
    };

    const handleSearch = () => {
      console.log("Calendaer. handleSearch");
      setRequestsMadeToday(requestsMadeToday + 1);
      //trigger user date search
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
          {selectionText}
          
          <br></br>
          {okSelected && <button className="date-button" onClick={handleSearch}>Hae hinnat</button>}
          
          <br></br>
          <div>
            <Button onClick={handleSnackbarClick}>Kalenteri ohje</Button>
            <Snackbar
              TransitionComponent={Slide}
              ContentProps={{
                sx: {
                  textAlign: 'left',
                  background: "green",
                  width: '100%',
                  height: 'auto', lineHeight: '28px'  //whiteSpace: "pre-wrap"
                }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={calendarInfo}
              action={action} />
          </div>
        </div>
      </div>
    );
};

export default Calendar;