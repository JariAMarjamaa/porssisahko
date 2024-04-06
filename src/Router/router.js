//npm i react-router
//npm i history
//npm i react-router-dom
import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate }   from 'react-router-dom';
//import { useLocation } from 'react-router-dom';
import { useStateValue } from '../State/index.js';
//import { useSelector } from 'react-redux';

import MainPage     from '../MainPage.tsx';
import LogInPage    from '../LogIn/index.jsx';
import FifthPage    from '../Pages/5Page.jsx';
import SixthPage    from '../Pages/6Page.jsx';
import DynamicPages from '../Pages/7-9Page.jsx';

import UnauthReDirect from "./unauthredirect.js";
import ProtectedRoute from "./protectedRoute.js";

import CallBack     from "../auth/callback.jsx";
import Auth         from "../utils/auth.js";
import AuthCheck    from "../utils/authCheck.js";
import { types }    from '../store/actions/actionTypes.js';

function RouteConfigs() {
    //const userIds = useSelector(state => state.login.userIds);
    //locationCallback(useLocation());
    const { state } = useStateValue();
    const navigate = useNavigate();
    const auth = new Auth();

    useEffect(() => {
        if (state.login.state !== types.LOGIN_SUCCEEDED &&
            state.login.state !== types.SIGNIN_SUCCEEDED &&
            state.login.state !== types.GOOGLE_LOGIN_SUCCEEDED &&
            state.login.state !== types.GOOGLE_LOGIN_FAILED) {
            console.log("ROUTE to Root / cause state: ", state.login.state);
            navigate('/', { replace: true });
        }
      }, [state.login.state, navigate]);

    const NotFoundPage = () => {
        console.log("ROUTE. PAGE NOT FOUND");
        return (
          <div style={{textAlign: "center", fontSize: "larger"}}>
            <h1>ROUTE 404 - Sivua ei löydy</h1>
            <p>Jartsan Ihanassa Routterissa on joku bugi</p>
            <p><a href="/">Napauta tästä</a></p>

            {/* Add navigation links or buttons here */}
          </div>
        );
      };

    const PrivateRoute = ({auth} ) => {
      console.log("ROUTE PrivateRoute. auth.isAuthenticated(): ", auth.isAuthenticated());
     
      if (/*state.login.state === types.LOGIN_SUCCEEDED ||*/ auth.isAuthenticated() === true )
      {
        return <ProtectedRoute auth={auth} /> ; 
      }
      return <UnauthReDirect auth={auth}/>;
    }

    return (
        <div>
            <Routes>
                {/* 
                Routtaus tehdään siinä järjestyksessä, kun match löytyy, niin järjestys on tärkeää
                <Route path="/" element={<div>Root route should not be possible</div>} />  component={LogInPage} poistettu V6ssa 
                <Route path='*'            element={<NotFoundPage />} /> 
                */}
                        
                <Route path='/index'          element={<NotFoundPage />} /> 
                <Route path='/mainPage'       element={<MainPage auth={auth}/>} />

                {<Route path='/authcheck'     element={<AuthCheck auth={auth} />} />}
                {<Route path='/callback'      element={<CallBack auth={auth} />} />}
                {<Route path='/redirect'      element={<UnauthReDirect auth={auth}/>} />}
                
                {<Route path='/privateroute'  element={<PrivateRoute auth={auth} /> } />}

                <Route path='/authorize'      element={<LogInPage />}/> 
                <Route path='/'               element={<LogInPage />}/> 
                                                             

                {state.login.state === types.LOGIN_SUCCEEDED &&
                <>
                    <Route path="/page5"    element={<FifthPage/>} />
                    <Route path="/page6"    element={<SixthPage/>} />
                    <Route path="/page/:id" element={<DynamicPages/>} />
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