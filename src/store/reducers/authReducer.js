import { types } from '../actions/actionTypes';

const initialState = {
  is_authenticated: false
};
  
const authReducer = (state = initialState, action) => {
  const payload = action.data;

  switch (action.type) {
    case types.GOOGLE_LOGIN_SUCCEEDED:
      console.log("AUTH REDUCER GOOGLE_LOGIN_SUCCEEDED. payload: ", payload);
      
      return {
        ...state,
        state: action.type,
        is_authenticated: true
      };

    case types.GOOGLE_LOGIN_FAILED:
      console.log("AUTH REDUCER GOOGLE_LOGIN_FAILED payload: ", payload);  
      return {
        ...state, 
        state: action.type,
        is_authenticated: false
      };
 
    case types.GOOGLE_LOGIN_HANDLED:
        console.log("AUTH REDUCER LOGIN_HANDLED. payload: ", payload);
        
        return {
          ...state,
          state: action.type
        };
  
    default:
    return state;
  }
};
  
export default authReducer;