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

export const applyMiddleware = ({ dispatch, logout }) => {
  
  /*const responseErrorFn = (response) => {
    if (response.status === 401) {
      console.log("MIDDLEWARE Got 401 starting automatic logout process");
        //dispatch ({ type: types.LOGOUT_401_NOTIFICATION, payload: true });
        logout(LOGOUT_REASONS.automatic);
    }
  }*/

  return async (action) => {
    /*console.log("MIDDLEWARE"+
                "\n action: ", action,
                "\n actiotype: ", action.type);*/

    switch (action.type) {

      case types.GOOGLE_LOGGING_IN:
        try {
          console.log("MIDDLEWARE. GOOGLE_LOGGING_IN -> dispatch LOGGING");
          dispatch({ type: types.LOGGING })
          const response = await new BackendApi().logIn(action.payload);
          processResponse(response, [200, 401, 406], "Sigin failed", dispatch /* tai näin: responseErrorFn*/);
          console.log("MIDDLEWARE. GOOGLE_LOGGIN_SUCCEEDED. response: ", response);
          dispatch({ type: response.status === 200 ? types.GOOGLE_LOGIN_SUCCEEDED : types.GOOGLE_LOGIN_FAILED, data: response });
        } catch (error) {
          console.log("MIDDLEWARE. GOOGLE_LOGGING_IN. ERROR: ", error);
          if (error instanceof ApiError) {
            console.log("MIDDLEWARE. GOOGLE_LOGGING_IN. CATCH API ERROR: ", error);
            dispatch({ type: types.GOOGLE_LOGIN_FAILED, data: { status: 501, msg: "LogIn. Middleware error 501"} })
          }
          else {
            console.log("MIDDLEWARE. GOOGLE_LOGGING_IN. CATCH MUU ERROR: ", error);
            dispatch({ type: types.GOOGLE_LOGIN_FAILED, data: { status: 502, msg: "LogIn. Middleware error 502" } })
          }
        }
        break;

      case types.ASYNC_SIGNING:
        try {
          console.log("MIDDLEWARE. SIGIN -> dispatch LOGGING");
          dispatch({ type: types.LOGGING })
          const response = await new BackendApi().signIn(action.payload);
          processResponse(response, [200, 401, 406], "Sigin failed", dispatch /* tai näin: responseErrorFn*/);
          console.log("MIDDLEWARE. SIGNIN_SUCCEEDED");
          dispatch({ type: response.status === 200 ? types.SIGNIN_SUCCEEDED : types.SIGNIN_FAILED, data: response });
        } catch (error) {
          console.log("MIDDLEWARE. SIGIN. ERROR: ", error);
          if (error instanceof ApiError) {
            console.log("MIDDLEWARE. SIGIN. CATCH API ERROR: ", error);
            dispatch({ type: types.SIGNIN_FAILED, data: { status: 501, msg: "LogIn. Middleware error 501"} })
          }
          else {
            console.log("MIDDLEWARE. SIGIN. CATCH MUU ERROR: ", error);
            dispatch({ type: types.SIGNIN_FAILED, data: { status: 502, msg: "LogIn. Middleware error 502" } })
          }
        }
        break;

      case types.ASYNC_LOGGING_IN:
        try {
          console.log("MIDDLEWARE. LOGIN -> dispatch LOGGING");
          dispatch({ type: types.LOGGING })
          const response = await new BackendApi().logIn(action.payload);
          processResponse(response, [200, 401, 402], "Login failed", dispatch /* tai näin: responseErrorFn*/);
          console.log("MIDDLEWARE. LOGIN_SUCCEEDED");
          dispatch({ type: response.status === 200 ? types.LOGIN_SUCCEEDED : types.LOGIN_FAILED, data: response });
        } catch (error) {
          console.log("MIDDLEWARE. LOGIN. ERROR: ", error);
          if (error instanceof ApiError) {
            console.log("MIDDLEWARE. LOGIN. CATCH API ERROR: ", error);
            dispatch({ type: types.LOGIN_FAILED, data: { status: 501, msg: "LogIn. Middleware error 501"} })
          }
          else {
            console.log("MIDDLEWARE. LOGIN. CATCH MUU ERROR: ", error);
            dispatch({ type: types.LOGIN_FAILED, data: { status: 502, msg: "LogIn. Middleware error 502" } })
          }
        }
        break;
      
      case types.ASYNC_LOGGING_OUT:
        try {
          console.log("MIDDLEWARE. LOGOUT -> dispatch LOGGING");
          dispatch({ type: types.LOGGING })
          const response = await new BackendApi().logOut(action.payload);
          processResponse(response, [200], "Logout failed", dispatch /* tai näin: responseErrorFn*/);
          console.log("MIDDLEWARE. LOGOUT_SUCCEEDED");
          dispatch({ type: types.LOGOUT_SUCCEEDED, data: response });
        } catch (error) {
          console.log("MIDDLEWARE. LOGOUT. ERROR: ", error);
    
          if (error instanceof ApiError) {
            console.log("MIDDLEWARE. LOGOUT. CATCH API ERROR: ", error);
            dispatch({ type: types.LOGOUT_FAILED, data: { status: 501, msg: "LogOut. Middleware error 501" } })
          }
          else {
            console.log("MIDDLEWARE. LOGOUT. CATCH MUU ERROR: ", error);
            dispatch({ type: types.LOGOUT_FAILED, data: { status: 502, msg: "LogOut. Middleware error 502" } })
          }
        }
        break;
      
      default: dispatch(action);
    }
  }
}

const errorHandler = ({ error, type, dispatch, errorDescription = '' }) => {
  // additionalParam is an optional object that is sent to errorHandler 
  //for handling specific cases
  /*
  if (typeof additionalParam.cheeseExists !== "undefined") {
   
  }
  */

  // if you use responsedata when error is thrown remember to handle the case when responsedata is null
  console.log("ERRORHANDLER error: ", error);
  console.log("ERRORHANDLER type", type);
  
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
