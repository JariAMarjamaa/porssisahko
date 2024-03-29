import { React } from 'react';
import { useParams } from 'react-router';

const CallBack = ({auth}) => {
  //access token
  //- expires_in: ms
  // token_type: bearer
  // id_token: json formaatissa

  const { id } = useParams();
  console.log("CALLBACK props auth.isAuthenticated: ", auth.isAuthenticated() );
  console.log("CALLBACK -> auth.handleAuth" );
  
  auth.handleAuth();
    
};

export default CallBack;