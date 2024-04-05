import auth0 from "auth0-js";
// npm install auth0-js

import { useNavigate }   from 'react-router-dom';

export default class Auth {
    auth0 = new auth0.WebAuth({
        //auth0 sivulta
        domain:         "dev-fxyhd16ujhw0bqtp.eu.auth0.com",
        clientID:       "DkIQ76VmdcFKaFPxUPhDevDMSAfwTQNC",
        redirectUri:    "https://jariamarjamaa.github.io/porssisahko/callback", //"http://localhost:3000/porssisahko/callback",
        responseType:   "token id_token",
        scope:          "openid profile email"
    });

    //Tämä ei tee mitään autentikonitia, vaan vain ohjaa käyttäjän auth0 sivulle
    login = () => {
        console.log("AUTH LOGIN");
        this.auth0.authorize();
    }

    handleAuth = () => {
        const navigate = useNavigate();
        console.log("AUTH handleAuth ");
        this.auth0.parseHash( (err, authResult) => {
            if (authResult)
            {
                console.log("AUTH handleAuth. authResult: ", authResult);
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token",     authResult.idToken); 
                localStorage.setItem("googleUser",   authResult.idTokenPayload.email/* .nickname*/); 
                
                let expiresAt = JSON.stringify( (authResult.expiresIn * 1000 + new Date().getTime()) );
                localStorage.setItem("expiresAt", expiresAt);

                setTimeout( () => {
                    console.log("AUTH handleAuth. TIMEOUT -> navigate to /authcheck");

                    navigate("/authcheck");
                }, 200); // 200 ms
            }
            else
            {
                console.error("HANDLE AUTH error: ", err);
                navigate("/privateroute");
            }
        });
    }

    getAuthData = () => {
        console.log("AUTH getAuthData ");
        const data = {
            //accessToken: localStorage.getItem("access_token"),
            //id_token:    localStorage.getItem("id_token"),
            //experiation: localStorage.getItem("expiresAt"),
            userId:        localStorage.getItem("googleUser"),
            password:      "GoogleAuthentication"
        };
        return data;
    }

    logout = () => {
        console.log("AUTH logout ");

        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("googleUser");
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
        console.log("AUTH isAuthenticated: ", (new Date().getTime() < expiresAt) );

        return new Date().getTime() < expiresAt
    }
}