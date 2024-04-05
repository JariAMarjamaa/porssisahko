import { React } from 'react';
import Linking   from "../Router/Linking.js";
import { useParams } from 'react-router';

const UnauthReDirect = ({auth}) => {
  const { id } = useParams();

  return (
      <div className="router-page">
        <h1>Google Autentikointi epäonnistui</h1>
        <h3>Ohjataan omalle info sivulle</h3>
        <h5>Rekisteröi google tunnus ensin Pörssiin!</h5>
        <p>Käytä selaimen paluu nuolta, niin pääset takaisin kirjautumis sivulle</p>

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