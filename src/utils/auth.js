import auth0 from "auth0-js";
// npm install auth0-js

import { useNavigate }   from 'react-router-dom';

export default class Auth {
    auth0 = new auth0.WebAuth({
        //auth0 sivulta
        domain:         "dev-fxyhd16ujhw0bqtp.eu.auth0.com",
        clientID:       "DkIQ76VmdcFKaFPxUPhDevDMSAfwTQNC",
        redirectUri:    "http://localhost:3000/porssisahko/callback",
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
        this.auth0.parseHash( (err, authResult) => {
            if (authResult)
            {
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token",     authResult.idToken); //id_token
                
                let expiresAt = JSON.stringify( (authResult.expiresIn * 1000 + new Date().getTime()) );
                localStorage.setItem("expiresAt", expiresAt);

                setTimeout( () => {
                    navigate("/authcheck");
                }, 200); // 200 ms
            }
            else
            {
                console.error("HANDLE AUTH error: ", err);
            }
        });
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expiresAt");
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
        return new Date().getTime() < expiresAt
    }
}