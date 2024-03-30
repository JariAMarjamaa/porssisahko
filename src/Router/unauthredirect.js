import { React } from 'react';
import Linking   from "../Router/Linking.js";
import { useParams } from 'react-router';

const UnauthReDirect = (props) => {
  const { id } = useParams();

  console.log("UnauthReDirect id: ", id );
  
  return (
      <div className="router-page">
        <h1>Autentikointi epäonnistui</h1>
        <h3>Routtaa uuteen osoitteeseen</h3>

        <br/>
        <br/>
        <br/>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
};

export default UnauthReDirect;