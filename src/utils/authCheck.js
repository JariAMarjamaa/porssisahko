import React, { Component, useEffect } from "react";
import {useStateValue} from "../State/index.js";
import { useNavigate } from 'react-router-dom';
import { types }       from '../store/actions/actionTypes.js';


function AuthCheck({auth}) {
//class AuthCheck extends Component {
    const { state, actions } = useStateValue();
    const navigate = useNavigate();

    useEffect( () => {
        switch(state.auth.state)
        {
            case "INITIAL_STATE":
                console.log("AUTH CHECK INITIAL_STATE. auth: ", auth);
                if( auth.isAuthenticated) {
                    actions.triggerGoogleLogInOk();
                }
                else
                {
                }
            break;
            
            case types.GOOGLE_LOGIN_SUCCEEDED:
                console.log("AUTH CHECK GOOGLE_LOGIN_SUCCEEDED");
                navigate("/");
                break;
            case types.GOOGLE_LOGIN_FAILED:
                console.log("AUTH CHECK GOOGLE_LOGIN_FAILED");
                navigate("/");
                break;
            default:
                break;
        }
    }, [state.auth, actions, navigate]);

    return (
        <div>

            </div>
    );
}

export default AuthCheck;
//export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);