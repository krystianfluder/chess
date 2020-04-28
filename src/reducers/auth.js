import { authTypes as types } from "../types";
const initState = {
  profile: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.check:
      return { ...state, profile: action.profile };
    case types.logout:
      return { ...state, profile: null };
    case types.login:
      return { ...state, profile: action.profile };
    case types.register:
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};

export default auth;
