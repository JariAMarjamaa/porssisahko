import { React } from 'react';
import { useParams } from 'react-router';

const ProtectedRoute = (props) => {
  const { id } = useParams();

  console.log("ProtectedRoute id: ", id );
  
  return (
      <div className="router-page">
        <h1>Salainen oma Routtaus</h1>
        <br/>
        <br/>
        <br/>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
};

export default ProtectedRoute;