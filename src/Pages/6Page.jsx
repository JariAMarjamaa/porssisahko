import { React } from 'react';
import Linking   from "../Router/Linking.js";

import './Pages.css';

const SixthPage = () => {
  
  const handleLocationChange = (location) => {
    console.log("SIVU 6. Route callback: ", location);
  }

  return (
      <div className="router-page">
        <h1>Todo-lista:</h1>
        <br/>
        <br/>
        <br/>

        <br/>
        <br/>
        <p>- Rekisteröinnin poisto</p>

        <br></br>
        <br></br>
        <br></br>
        {<Linking sendPageSelection={(route) => handleLocationChange(route)} ></Linking> }

      </div>
    );
};

export default SixthPage;