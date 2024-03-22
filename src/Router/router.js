//npm i react-router
//npm i history
//npm i react-router-dom
import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate }   from 'react-router-dom';
//import { useLocation } from 'react-router-dom';
import { useStateValue } from '../State/index.js';
//import { useSelector } from 'react-redux';

import MainPage         from '../MainPage.tsx';
import LogInPage    from '../LogIn/index.jsx';
import FifthPage    from '../Pages/5Page.jsx';
import SixthPage    from '../Pages/6Page.jsx';

import Linking      from "./Linking.js";
import { types }    from '../store/actions/actionTypes.js';


function RouteConfigs({showLinks, pageSelection}) {
    //const userIds = useSelector(state => state.login.userIds);
    //locationCallback(useLocation());
    const { state } = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        if (state.login.state !== types.LOGIN_SUCCEEDED &&
            state.login.state !== types.SIGNIN_SUCCEEDED) {
            console.log("ROUTE Log or SignIn failed");
            navigate('/porssisahko', { replace: true });
        }
      }, [state.login.state, navigate]);

    console.log("ROUTE ",state.login.state);

    return (
        <div>
            {showLinks && <Linking sendPageSelection={pageSelection} ></Linking> }

            <Routes>
                {/*<Route path="/" element={<div>Root route should not be possible</div>} /> 
                   <Route path='/porssisahko' /> {/* element={<LogInPage />} component={LogInPage} poistettu V6ssa */}
                        
                <Route path='/'             element={<MainPage/>} />
                <Route path='/porssisahko'  element={<LogInPage />}/>                                               

                {state.login.state === types.LOGIN_SUCCEEDED &&
                <>
                    <Route path="/page5" element={<FifthPage/>} />
                    <Route path="/page6" element={<SixthPage/>} />
                </>
                }

                {state.login.state === types.SIGNIN_SUCCEEDED &&
                <>
                    <Route path="/page5" element={<FifthPage/>} />
                    <Route path="/page6" element={<SixthPage/>} />
                </>
                }


            </Routes>
        </div>
    )
}

export default RouteConfigs;