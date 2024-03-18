import { types } from './actionTypes';

export const useActions = (state, dispatch) => ({
  
  triggerClearInfoState     : data => dispatch({type: types.CLEAR_INFO_STATE,     payload: data}),
  triggerShowCalendarInfo   : data => dispatch({type: types.SHOW_CALENDAR_INFO,   payload: data}),
  triggerShowCheckPasswords : data => dispatch({type: types.SHOW_CHECK_PASSWORDS, payload: data}),

  triggerLogIn  : data => dispatch({type: types.ASYNC_LOGGING_IN,  payload: data}),
  triggerLogOut : data => dispatch({type: types.ASYNC_LOGGING_OUT, payload: data}),
  triggerSignIn : data => dispatch({type: types.ASYNC_SIGNING,     payload: data}),
});