import { React, useState } from 'react';
import PopupWindow from '../PopupWindow/Popup.jsx';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import 'dayjs/locale/fi';

const FourthPage = ({ onClose }) => {
    // Load the Finnish locale for dayjs
    dayjs.locale('fi');
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null /*new Date()*/);

    const handleDateChange = (date) => {
      // Handle date change
      console.log("Valittu päivä: ", date);
      setSelectedDate(date);
    };

    const openPopupWindow = (type) => {
      setShowVideoPopup(true);
    };

    const handlePopupClose = (type) => {
      setShowVideoPopup(false);
    };

    const shouldDisableDate = (day) => {
      return dayjs(day).isAfter(currentDate, 'day');
    };

    return (
      <div className="new-page-modal">
        <h1>Neljäs sivu</h1>

        <br/>
        <br/>
        <br/>

        <button className="button" onClick={() => openPopupWindow("video")}>Katso video Robottitestauksesta</button>
        {showVideoPopup && <PopupWindow   onClose={() => handlePopupClose("video")} type="video" content="" />} 

        <br/>
        <br/>

        {/*npm install @mui/x-date-pickers
           npm install dayjs */}
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DatePicker
              defaultValue={dayjs(""+currentDate.getFullYear()+"-"+ (currentDate.getMonth()+1) +"-" +  currentDate.getDate())}
              views={['year', 'month', 'day']}
              className="calendar"
              format="DD/MM/YYYY"
             // value={selectedDate}
              onChange={handleDateChange}
              localeText={{ datePickerToolbarTitle: 'Valittu päivä', cancelButtonLabel: 'Peruuta', }}
              shouldDisableDate={shouldDisableDate}
              />
             </LocalizationProvider>
        </div>

        {/*<button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>*/}
      </div>
    );
};

export default FourthPage;