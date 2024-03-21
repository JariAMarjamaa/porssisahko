import React, { Component } from "react";
import { Link } from 'react-router-dom';

function Linking({sendPageSelection}) {

    //<Link to = { {pathname: "", search: , hash: ,  state:} }
    //state on eri kuin Redux state, eikä vaikuta siihen
    return (
        <div >
                {/*
                <Link to="/mainPage"> <button className="button" onClick={() => sendFeedback()} >Pääsivu</button> </Link>
                <Link to="/page2">    <button className="button" onClick={() => sendFeedback()} >2-sivu</button>  </Link>
                <Link to="/page3">    <button className="button" onClick={() => sendFeedback()} >3-sivu</button>  </Link>
                <Link to="/page4">    <button className="button" onClick={() => sendFeedback()} >4-sivu</button>  </Link>
                */}
                
                <Link to="/page5">    <button className="button" onClick={ () => sendPageSelection("Page5") } >5-sivu</button>  </Link>
                <Link to="/page6">    <button className="button" onClick={ () => sendPageSelection("Page6") } >6-sivu</button>  </Link>
            </div>
        );
};
export default Linking