import { React, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import 'dayjs/locale/fi';

// npm install @mui/x-date-pickers
// npm install dayjs

const Calendar = ({ dateSelected, setOKSelected }) => {
    // Load the Finnish locale for dayjs
    dayjs.locale('fi');
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const lastSelectableDate = new Date('2023-01-01');

    const [selectedDate, setSelectedDate] = useState(null);
    //const [okSelected,   setOKSelected]   = useState(false);

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
      console.log("Calendar: handleCancel. selectedDate: ", selectedDate);

      dateSelected(selectedDate);
    };

    const handleAccept = () => {
      // Handle cancel button press
      console.log("Calendar: handleAccept. selectedDate: ", selectedDate);

      setOKSelected(true);
    };

    const handleOpen = () => {
      // Handle calendar opening
      dateSelected(null);
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
             <br></br>
           </div>
      </div>
    );
};

export default Calendar;