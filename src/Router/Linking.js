import React, { Component } from "react";
import { Link } from 'react-router-dom';

function Linking({sendPageSelection}) {

    //<Link to = { {pathname: "", search: , hash: ,  state:} }
    //state on eri kuin Redux state, eikä vaikuta siihen
    return (
        <div >
            <Link to="/page5" className="link-button"> <button className="button" onClick={ () => sendPageSelection("Page5") } >5-sivu</button> </Link>
            <Link to="/page6" className="link-button"> <button className="button" onClick={ () => sendPageSelection("Page6") } >6-sivu</button> </Link>
        </div>
    );
};
export default Linking