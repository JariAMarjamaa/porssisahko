import { types } from '../actions/actionTypes';
import { CalendarInfoContent }  from '../../content/text_content.jsx';


const initialState = {
  state: "INITIAL_STATE",
  text: null
};
  
  const infoReducer = (state = initialState, action) => {
    const payload = action.data;

    switch (action.type) {
      
      case types.CLEAR_INFO_STATE:
      console.log("INFO REDUCER. CLEAR_INFO_STATE");  
        return {
          ...state,
          state: "INITIAL_STATE",
          text: null
        };      
      case types.SHOW_CALENDAR_INFO:
      console.log("INFO REDUCER. SHOW_CALENDAR_INFO");  
        return {
          ...state,
          state: action.type,
          text: CalendarInfoContent
        };
      case types.SHOW_CHECK_PASSWORDS:
        console.log("INFO REDUCER. SHOW_CHECK_PASSWORDS");  
          return {
            ...state,
            state: action.type,
            text: "Tarkista salasanat"
          };

      default:
        return state;
    }
  };
  
export default infoReducer;