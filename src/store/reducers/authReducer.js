import { types } from '../actions/actionTypes';

const initialState = {
  is_authenticated: false,
  accessToken: null,
  id_token: null,
  experiation: null
};
  
const authReducer = (state = initialState, action) => {
  const payload = action.data;

  switch (action.type) {
    case types.GOOGLE_LOGIN_SUCCEEDED:
      console.log("AUTH REDUCER GOOGLE_LOGIN_SUCCEEDED. payload: ", payload);
      
      return {
        ...state,
        state: action.type,
        is_authenticated: true,
        //accessToken: payload.accessToken,
        //id_token:    payload.id_token,
        //experiation: payload.experiation,
      };

    case types.GOOGLE_LOGIN_FAILED:
      console.log("AUTH REDUCER GOOGLE_LOGIN_FAILED payload: ", payload);  
      return {
        ...state, 
        state:            action.type,
        is_authenticated: false,
        status:           payload.status
      };
 
    case types.GOOGLE_LOGGING_IN:
        console.log("AUTH REDUCER LOGIN_HANDLED. payload: ", payload);
        
        return {
          ...state
        };

    case types.LOGOUT_SUCCEEDED:
        console.log("AUTH REDUCER LOGOUT_SUCCEEDED. payload: ", payload);
          return {
            ...state,
            state:            action.type,
            is_authenticated: false,
            status:           payload.status
      };
  
    default:
    return state;
  }
};
  
export default authReducer;