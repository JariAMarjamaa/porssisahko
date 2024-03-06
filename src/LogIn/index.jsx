import { React, useState } from 'react';

import './index.css';

const LogIn = ({handleUserSelection}) => {
    const [userId,   setUserId]   = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (event) => {
      event.preventDefault();
      console.log("SUBMIT");
      let userData = {
        userId: userId,
        password: password
      };

     /* fetch("http://localhost:4000/LogIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).then(response => response.json()).then(data => { //promise response
        console.log("LOGED IN: ", data);
      });*/
      handleUserSelection(true);
    };

    const handleSignIn = (event) => {
      event.preventDefault();
      console.log("SIGNIN");
      let userData = {
        userId: userId,
        password: password
      };

   /*   fetch("http://localhost:4000/LogIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).then(response => response.json()).then(data => { //promise response
        console.log("SIGNED IN: ", data);
      });*/
    };

    return (
      <div className="loginPage">
        <h1 data-testid="RFW_MainPageText">Pörssisähkökäppyrä harjoitus</h1>
        <br/>
        <br/>
        <h3>Sisäänkirjautuminen:</h3>

        <div>
          <form onSubmit={handleLogIn}>
            <input className="button" type="text"     name="userID"   placeholder='Tunnus'   onChange={ event => setUserId(event.target.value)}></input>
            <br></br>
            <br></br>
            <input className="button" type="password" name="password" placeholder='Salasana' onChange={ e => setPassword(e.target.value)}></input>
            <br></br>
            <br></br>
            <input className="button" type="submit" value="Kirjaudu sisään"></input>
          </form>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <form onSubmit={handleSignIn}>
            <input className="button" type="submit" value="Rekisteröidy"></input>
        </form>

      </div>
    );
};

export default LogIn;