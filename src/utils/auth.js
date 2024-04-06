import auth0 from "auth0-js";
// npm install auth0-js

import { useNavigate }   from 'react-router-dom';

export default class Auth {
    constructor(){
        this.userProfile = {};
    }

    auth0 = new auth0.WebAuth({
        //auth0 sivulta
        domain:         "dev-fxyhd16ujhw0bqtp.eu.auth0.com",
        clientID:       "DkIQ76VmdcFKaFPxUPhDevDMSAfwTQNC",
        redirectUri:    "https://jariamarjamaa.github.io/porssisahko/callback", //"https://jariamarjamaa.github.io/porssisahko/callback", //"http://localhost:3000/porssisahko/callback",
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
                //console.log("AUTH handleAuth. authResult: ", authResult);
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token",     authResult.idToken); 
                localStorage.setItem("googleUser",   authResult.idTokenPayload.email/* .nickname*/); 
                localStorage.setItem("googlePicture", authResult.idTokenPayload.picture); 
                
                let expiresAt = JSON.stringify( (authResult.expiresIn * 1000 + new Date().getTime()) );
                localStorage.setItem("expiresAt", expiresAt);

                //EI toimi vielä
                /*this.userProfile = { accessToken: authResult.accessToken,
                                     idToken:     authResult.idToken,
                                     email:       authResult.idTokenPayload.email,
                                     name:        authResult.idTokenPayload.name,
                                     picture:     authResult.idTokenPayload.picture};*/
                console.log("AUTH. handleAuth. Set userProfile. ",this.userProfile);
                //this.getProfile();

                setTimeout( () => {
                    console.log("AUTH handleAuth. TIMEOUT -> navigate to /authcheck");

                    navigate("/authcheck");
                }, 2000); // 200 ms
            }
            else
            {
                console.error("HANDLE AUTH error: ", err);
                navigate("/privateroute");
            }
        });
    }

    getAccessToken = () => {
        if (localStorage.getItem("access_token")){
            const accessToken = localStorage.getItem("access_token");
            return accessToken;
        }
        else {
            return null;
        }
    }

    getProfile = () => {
        console.log("AUTH. getProfile. ",this.userProfile);
        return this.userProfile;

        //tämä ei toimi
        //let accessToken = this.getAccessToken();
        /*console.log("AUTH. getProfile. accessToken: ",accessToken);
        if (accessToken) {
            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if (profile)
                {
                    console.log("AUTH. getProfile. profile: ",profile);
                    this.userProfile = { profile };
                }
                else {
                    console.log("AUTH. getProfile. virhe: ",err);
                }
            })
        }*/
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
        localStorage.removeItem("googlePicture"); 
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
        console.log("AUTH isAuthenticated: ", (new Date().getTime() < expiresAt) );

        return new Date().getTime() < expiresAt
    }
}