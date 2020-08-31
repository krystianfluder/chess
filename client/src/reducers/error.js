import { errorTypes as types } from "../types";
const initState = {
  error: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case types.set:
      return { ...state, error: action.error };
    case types.remove:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default errorReducer;
