import { produce } from "immer";
import { commonTypes as types } from "../types";

const initState = {
  loading: null,
  message: null,
};

const commmonReducer = (state = initState, action) => {
  switch (action.type) {
    case types.COMMON_SET_MESSAGE:
      return produce(state, (draftState) => {
        draftState.message = action.message;
      });
    case types.COMMON_REMOVE_MESSAGE:
      return produce(state, (draftState) => {
        draftState.message = null;
      });
    default:
      return state;
  }
};

export default commmonReducer;
