import { React } from 'react';
import DownloadButton from '../Buttons/DonwloadingButton.jsx';

const ThirdPage = ({ onClose }) => {

  return (
    <div className="new-page-modal">
      <h1>Kolmas sivu</h1>

      <br/>
      <br/>
      <br/>

      <DownloadButton />  

      <br/>
      <br/>

      <button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>
    </div>
  );
};

export default ThirdPage;