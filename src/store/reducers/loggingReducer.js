import { types } from '../actions/actionTypes';

const initialState = {
  state: "INITIAL_STATE",
  userIds: [],
  status: 0,
  logging: false,
  infoText: null
};
  
  const loggingReducer = (state = initialState, action) => {
    const payload = action.data;

    switch (action.type) {
      case types.LOGGING:
      console.log("REDUCER. LOGGING");  
        return {
          ...state,
          state: action.type,
          logging: true,
          infoText: null
        };
      
      case types.LOGIN_SUCCEEDED:
      case types.SIGNIN_SUCCEEDED:
      console.log("REDUCER. ",action.type," payload: ", payload);  
        return {
          ...state,
          state: action.type,
          status: payload.status,
          logging: false,
          infoText: null,
          userIds: [...state.userIds, payload.userId]
        };

      case types.LOGIN_FAILED:
      case types.SIGNIN_FAILED:
      console.log("REDUCER. ",action.type," payload: ", payload);  
        return {
          ...state, 
          state: action.type,
          status: payload.status,
          logging: false,
          infoText: payload.msg
        };

      case types.LOGOUT_SUCCEEDED:
      console.log("REDUCER. LOGOUT_SUCCEEDED. payload: ", payload);  
        return {
          ...state,
          state: action.type,
          status: payload.status,
          logging: false,
          infoText: null,
          userIds: state.userIds.filter(id => id !== payload.userId), // Remove the specified user ID
        };

      case types.LOGOUT_FAILED:
      console.log("REDUCER. LOGOUT_FAILED. payload: ", payload);  
        return {
          ...state, 
          state: action.type,
          status: payload.status,
          logging: false,
          infoText: payload.msg
        };

        default:
          return state;
    }
  };
  
export default loggingReducer;