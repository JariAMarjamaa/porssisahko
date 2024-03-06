import { React, useState } from 'react';

import './Pages.css';

const FourthPage = () => {
    const [userId,   setUserId]   = useState("");
    const [password, setPassword] = useState("");

    const handleForm = (event) => {
      event.preventDefault();
      console.log("SUBMIT");
      let userData = {
        userId: userId,
        password: password
      };

      fetch("http://localhost:4000/LogIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).then(response => response.json()).then(data => { //promise response
        console.log("LOGED IN: ", data);
      });
    } ;

    return (
      <div className="new-page-modal">
        <h1>Neljäs sivu</h1>
        <br/>
        <br/>
        <br/>

        <h3>Todo-lista:</h3>
        <div>
          <form onSubmit={handleForm}>
            <label>User ID</label>
            <br></br>
            <input type="text" name="userID" onChange={ event => setUserId(event.target.value)}></input>
            <br></br>
            <input type="password" name="password" onChange={ e => setPassword(e.target.value)}></input>
            <br></br>
            <input type="submit" value="LoginForm"></input>
          </form>
        </div>
        <br/>
        <br/>
      </div>
    );
};

export default FourthPage;