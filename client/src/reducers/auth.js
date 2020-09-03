import { authTypes as types } from "../types";
import { produce } from "immer";
const initState = {
  profile: null,
  accessToken: null,
  refreshToken: null,
  errorMessage: null,
  tokens: [],
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.AUTH_LOGOUT:
      return { ...initState };
    case types.AUTH_CREATE_ERROR_MESSAGE:
      return produce(state, (draftState) => {
        draftState.errorMessage = action.errorMessage;
      });
    case types.AUTH_REMOVE_ERROR_MESSAGE:
      return produce(state, (draftState) => {
        draftState.errorMessage = null;
      });
    case types.AUTH_REFRESH_TOKEN:
      return produce(state, (draftState) => {
        const { accessToken, refreshToken } = action;
        draftState.accessToken = accessToken;
        draftState.refreshToken = refreshToken;
      });
    case types.AUTH_FETCH_PROFILE:
      return produce(state, (draftState) => {
        draftState.profile = action.profile;
      });
    case types.AUTH_FETCH_TOKENS:
      return produce(state, (draftState) => {
        draftState.tokens = action.tokens;
      });
    case types.AUTH_NEW_PASSWORD_SUCCESS:
      return state;
    case types.AUTH_RESET_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default auth;
