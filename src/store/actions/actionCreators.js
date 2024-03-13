import { types } from './actionTypes';

export const useActions = (state, dispatch) => ({
  
  triggerLogIn  : data => dispatch({type: types.ASYNC_LOGGING_IN, payload: data}),

  triggerLogOut : data => dispatch({type: types.ASYNC_LOGGING_OUT, payload: data}),

});