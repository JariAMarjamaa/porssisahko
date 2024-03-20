//npm i react-router
//npm i history
//npm i react-router-dom
import React, { Component } from "react";
//import { Router, Route } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import history from "../helpers/history.js";

import MainPage         from '../MainPage.tsx';
import LogInPage        from '../LogIn/index.jsx';
import SecondPage       from '../Pages/2Page.tsx';
import ThirdPage        from '../Pages/3Page.jsx';
import FourthPage       from '../Pages/4Page.jsx';
import FifthPage        from '../Pages/5Page.jsx';
import SixthPage        from '../Pages/6Page.jsx';

class RouteConfigs extends Component {
    //ikään kuin if-else, eli vain  yksi route/yksi sivu voidaan näyttää kerrallaan
    render() {
        return (
            <div >
                <Router >
                    <div>
                    <Routes>
                        {/*<Route path="/" element={<div>Root route should not be possible</div>} />*/}
                        <Route path='/porssisahko' element={<LogInPage />} /> {/* component={LogInPage} poistettu V6ssa */}
                        <Route path='/mainPage'    element={<MainPage/>} />
                        <Route path="/page2"       element={<SecondPage/>} />
                        <Route path="/page3"       element={<ThirdPage/>} />
                        <Route path="/page4"       element={<FourthPage/>} />
                        <Route path="/page5"       element={<FifthPage/>} />
                        <Route path="/page6"       element={<SixthPage/>} />
                    </Routes>
                    </div>
                </Router>
            </div>
        )
    }
}

export default RouteConfigs;