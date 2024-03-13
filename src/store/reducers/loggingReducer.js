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
      console.log("REDUCER. LOGIN_SUCCEEDED. payload: ", payload);  
      return {
          ...state,
          state: action.type,
          status: payload.status,
          logging: false,
          infoText: null,
          userIds: [...state.userIds, payload.userId]
        };

      case types.LOGIN_FAILED:
      console.log("REDUCER. LOGIN_FAILED. payload: ", payload);  

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