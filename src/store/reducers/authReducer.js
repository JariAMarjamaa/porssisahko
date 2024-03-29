import { types } from '../actions/actionTypes';

const initialState = {
  is_authenticated: false,
  accessToken: null,
  id_token: null,
  experiation: null,
  userIds: []
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
        userIds:          [...state.userIds, payload.userId]
      };

    case types.GOOGLE_LOGIN_FAILED:
      console.log("AUTH REDUCER GOOGLE_LOGIN_FAILED payload: ", payload);  
      return {
        ...state, 
        state:            action.type,
        is_authenticated: false,
        status:           payload.status,
        infoText:         payload.msg
      };
 
    case types.GOOGLE_LOGGING_IN:
        console.log("AUTH REDUCER LOGIN_HANDLED. payload: ", payload);
        
        return {
          ...state
        };

    case types.GOOGLE_LOGGED_OUT:
        console.log("AUTH REDUCER GOOGLE_LOGGED_OUT. payload: ", payload);
          return {
            ...state,
            state:            action.type,
            is_authenticated: false,
            status:           payload.status,
            infoText:         null,
            userIds:          state.userIds.filter(id => id !== payload.userId), // Remove the specified user ID
      };
  
    default:
    return state;
  }
};
  
export default authReducer;