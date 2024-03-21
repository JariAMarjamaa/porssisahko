//npm i react-router
//npm i history
//npm i react-router-dom
import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';

//import history from "../helpers/history.js";
import { useStateValue } from '../State/index.js';
//import { useSelector } from 'react-redux';

import MainPage         from '../MainPage.tsx';
import LogInPage    from '../LogIn/index.jsx';
//import SecondPage       from '../Pages/2Page.tsx';
//import ThirdPage        from '../Pages/3Page.jsx';
//import FourthPage       from '../Pages/4Page.jsx';
import FifthPage    from '../Pages/5Page.jsx';
import SixthPage    from '../Pages/6Page.jsx';

import Linking      from "./Linking.js";

function RouteConfigs({pageSelection}) {
    //const userIds = useSelector(state => state.login.userIds);
    //locationCallback(useLocation());


    //basename="/porssisahko"

        return (
            <div >
                <Router basename="/porssisahko" >
                    <div>
                    <Linking sendPageSelection={pageSelection} ></Linking>
                    <Routes>
                         {/*<Route path="/" element={<div>Root route should not be possible</div>} /> 
                        <Route path='/porssisahko' /> {/* element={<LogInPage />} component={LogInPage} poistettu V6ssa 
                        {/*<Route path='/mainPage'    element={<MainPage/>} />
                        <Route path="/page2"       element={<SecondPage/>} />
                        <Route path="/page3"       element={<ThirdPage/>} />
                        <Route path="/page4"       element={<FourthPage/>} />*/}
                        
                        <Route path="/page5"       element={<FifthPage/>} />
                        <Route path="/page6"       element={<SixthPage/>} />


                    </Routes>
                    </div>
                </Router>
            </div>
        )
}

export default RouteConfigs;