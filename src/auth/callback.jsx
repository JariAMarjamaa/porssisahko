import { React } from 'react';
import Linking   from "../Router/Linking.js";
import { useParams } from 'react-router';
import Auth from "../utils/auth.js";

const CallBack = (props) => {
  //access token
  //- expires_in: ms
  // token_type: bearer
  // id_token: json formaatissa
  const auth = new Auth();


  const { id } = useParams();
  console.log("CALLBACK props: ", props );
  auth.handleAuth();
  
  const handleAuthentication = (props) => {
    console.log("ROUTE handleAuthentication. props: ",props);

    if (props.location.hash) {
      auth.handleAuth();
    }
  }
 
};

export default CallBack;