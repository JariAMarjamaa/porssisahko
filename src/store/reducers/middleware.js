import { BackendApi } from '../../API/Backend.js';
import { types } from '../actions/actionTypes';
import { ApiError, processResponse } from "../../helpers/process.js";

export const ERROR_TYPES = {
  http: "HTTP",
  general: "general"
}

const LOGOUT_REASONS = {
  automatic: "AUTOMATIC",
  normal: "NORMAL"
}

export const applyMiddleware = ({dispatch, logout}) => {
    const responseErrorFn = (response) => {
        if (response.status === 401) {
          console.log("Got 401 starting automatic logout process");
          //dispatch ({ type: types.LOGOUT_401_NOTIFICATION, payload: true });
          logout(LOGOUT_REASONS.automatic);
        }
      }

    return async (action) => {
    /*console.log("MIDDLEWARE"+
                "\n action: ", action,
                "\n actiotype: ", action.type);*/

    //const d1 = new Date();
    //const timeNow = d1.getTime();

    console.log("MIDDLEWARE. action: ",action,
                "\n action.type: ", action.type);  

    switch (action.type) {

      case types.ASYNC_LOGGING_IN:
        try {
          console.log("MIDDLEWARE. dispatch LOGGING");
          dispatch({ type: types.LOGGING })
          const response = await new BackendApi().logIn(action.payload);
          console.log("MIDDLEWARE. LOGGING response: ", response);

          processResponse(response, [200, 401], "Login failed", dispatch /* tai näin: responseErrorFn*/);
          dispatch({ type: response.status === 200 ? types.LOGIN_SUCCEEDED : types.LOGIN_FAILED, data: response });
          } catch (error) {
            console.log("MIDDLEWARE. LOGIN. ERROR: ", error);

            if (error instanceof ApiError) {
              console.log("MIDDLEWARE. LOGIN. CATCH API ERROR: ", error);

              dispatch({ type: types.LOGIN_FAILED, data: { msg: "Kirjautuminen epäonnistui" } })
            }
            else {
              console.log("MIDDLEWARE. LOGIN. CATCH MUU ERROR: ", error);

              dispatch({ type: types.LOGIN_FAILED, data: { msg: error.response && error.response.data && error.response.data !== "" ?  error.response.data.message : undefined } })
            }
          }
          break;
      default: dispatch(action);
    }
  }
}

/*
params:
  error: Error object thrown
  type: Action type to dispatch error
  dispatch: dispatch function
  errorDescription: (optional) error description
*/
const errorHandler = ({ error, type, dispatch, errorDescription = '' }) => {
  // additionalParam is an optional object that is sent to errorHandler 
  //for handling specific cases
  /*
  if (typeof additionalParam.cheeseExists !== "undefined") {
   
  }
  */

  // if you use responsedata when error is thrown remember to handle the case when responsedata is null
  console.log("error ERRORHANDLERISSA", error);
  console.log("type ERRORHANDLERISSA", type);
  
  if (error instanceof ApiError) {
    console.log("errorHandler IF error is ApiError")
    dispatch({
      type: type,
      data: {
        errorType: ERROR_TYPES.http,
        Code: error.code,
        errorText: errorDescription,
        responsedata: error.responsedata
      },
    })
  }
  else if (error.response && error.response.status && (error.response.status == "500" || error.response.status == "400" || error.response.status == "403" || error.response.status == "404" || error.response.status == "502" || error.response.status == "503")) {
    //comparison must be ==, not === for this to work.
    console.log("errorHandler IF error is NOT ApiError but is ONE of the COMMON error codes, error.response", error.response)
    //console.log("errorHandler: error.response.data", error.response.data)
    dispatch({
      type: type,
      data: {
        errorType: ERROR_TYPES.http,
        Code: error.response.status,
        errorText: error,
        responsedata: error.response?.data ? error.response.data : null
      },
    })
    console.error("errorHandler. error: ", error);
  }
  else {
    console.log("errorHandler IF error is NOT ApiError, error.response", error.response)
    //console.log("errorHandler: error.response.data", error.response.data)
    dispatch({
      type: type,
      data: {
        errorType: ERROR_TYPES.general,
        Code: 7777777,
        errorText: error,
        responsedata: error.response?.data ? error.response.data : null
      },
    })
  }
  console.error("errorHandler. error: ", error);
}
