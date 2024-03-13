import { types } from './actionTypes';

export const useActions = (state, dispatch) => ({
  
  triggerLogIn : data => dispatch({type: types.ASYNC_LOGGING_IN, payload: data}),

  //triggerLoadLeops:                 data => dispatch({ type: types.ASYNC_LOAD_LEOPS, payload: data }),
  //triggerSaveLeopsLocking:          data => dispatch({ type: types.ASYNC_SAVE_LOCKING_LEOPS, payload: data }),
  //triggerSaveLeopsChildEvaluations: data => dispatch({ type: types.ASYNC_SAVE_CHILD_EVALUATIONS_LEOPS, payload: data }),
  //triggerSaveLeopsParentComments:   data => dispatch({ type: types.ASYNC_SAVE_PARENT_COMMENTS_LEOPS, payload: data }),
  //triggerLeopsHandled:              data => dispatch({ type: types.LEOPS_HANDLED, payload: data }),
});