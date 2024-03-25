import { React } from 'react';
import Linking   from "../Router/Linking.js";
import { useParams } from 'react-router';

import './Pages.css';

const DynamicPages = (props) => {
  const { id } = useParams();

  console.log("DYNAMIC PAGE id: ", id );
  
  const handleLocationChange = (location) => {
    console.log("DYNAMIC PAGE. Route callback: ", location);
  }


  return (
      <div className="router-page">
        <h1>Dynamic generated and Linked page:  {id}</h1>
        <br/>
        <br/>
        <br/>
        <br></br>
        <br></br>
        <br></br>
        {<Linking sendPageSelection={(route) => handleLocationChange(route)} ></Linking> }
      </div>
    );
};

export default DynamicPages;