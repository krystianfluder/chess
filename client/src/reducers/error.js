import { produce } from "immer";
import { errorTypes as types } from "../types";

const initState = {
  error: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ERROR_SET:
      return produce(state, (draftState) => {
        draftState.error = action.error;
      });
    case types.ERROR_HIDE:
      return produce(state, (draftState) => {
        draftState.error = null;
      });
    default:
      return state;
  }
};

export default errorReducer;
