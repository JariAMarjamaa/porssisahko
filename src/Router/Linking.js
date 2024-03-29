import React, { Component } from "react";
import { Link } from 'react-router-dom';

function Linking({sendPageSelection}) {
    //<Link to = { {pathname: "", search: , hash: ,  state:} }
    //state on eri kuin Redux state, eikä vaikuta siihen
    
    //Routausten ja Linkkien dynaaminen hallinta
    //Demo esim kun serveriltä tulee sivun id
    const state = {
        nums: 
        [
            {id: 7},
            {id: 8},
            {id: 9}
        ]
    };

    return (
        <div >
            <div style={{color: "black"}}>Routteri linkit:</div>
            <Link to="/page5" className="link-button"> <button className="button" onClick={ () => sendPageSelection("Page5") } >5-sivu</button> </Link>
            <Link to="/page6" className="link-button"> <button className="button" onClick={ () => sendPageSelection("Page6") } >6-sivu</button> </Link>
            <br/>
            <br/>

            {/*state.nums.map(num => 
                <Link key={num.id} to={{pathname: "/page/" + num.id }} className="link-button">
                    <button className="button" onClick={ () => sendPageSelection("Page"+num.id) } >{num.id} -sivu</button>
                </Link>
            )*/}

        </div>
    );
};
export default Linking