import { BACKEND_URL } from "./env";
import reduxStore from "./store";
import errorsActions from "./actions/error";
import authActions from "./actions/auth";
import { errorActions, commonActions } from "./actions";

const axios = require("axios");

const axiosRefreshToken = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosDefault = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosDefault.interceptors.request.use(function (config) {
  reduxStore.dispatch(commonActions.toggleSpinner(true));
  return config;
});

axiosDefault.interceptors.response.use(
  (response) => {
    reduxStore.dispatch(commonActions.toggleSpinner(false));
    return response;
  },
  async (error) => {
    const { dispatch } = reduxStore;
    const { response } = error;

    if (response) {
      const { message } = response.data;
      const { url } = response.config;
      if (
        url === `/auth/login` ||
        url === `/auth/register` ||
        url === `/auth/reset` ||
        url === `/auth/change-password`
      ) {
        if (message) {
          dispatch(authActions.createErrorMessage(message));
        } else {
          dispatch(errorsActions.set(response.data));
        }
      } else {
        dispatch(errorsActions.set(message));
      }
      dispatch(commonActions.toggleSpinner(false));
      return response;
    } else {
      dispatch(commonActions.toggleSpinner(false));
      dispatch(errorsActions.set(error.message));
    }
  }
);

axiosRefreshToken.interceptors.request.use(function (config) {
  reduxStore.dispatch(commonActions.toggleSpinner(true));
  const accessToken = reduxStore.getState().auth.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosRefreshToken.interceptors.response.use(
  (response) => {
    reduxStore.dispatch(commonActions.toggleSpinner(false));
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { dispatch, getState } = reduxStore;
    const { response } = error;

    if (response) {
      const { status, data } = response;
      const { message } = data;

      if (status === 401 && message === "The token is invalid or has expired") {
        const url = `${BACKEND_URL}/auth/refresh-token`;
        const state = getState();
        try {
          const res = await axios.post(url, { token: state.auth.refreshToken });
          const { accessToken, refreshToken } = res.data;
          dispatch(authActions.refreshTokenAsync(accessToken, refreshToken));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          const newResponse = await axios.request(originalRequest);
          return newResponse;
        } catch (error) {
          if (error.response) {
            if (
              error.response.status === 401 &&
              error.response.data.message ===
                "Incorrect refresh token or not provided"
            ) {
              dispatch(errorsActions.set("Incorrect refresh token"));
              dispatch(authActions.logoutAsync());
            }
          } else {
            dispatch(errorActions.set(error));
          }
        }
      } else {
        dispatch(errorsActions.set(message));
      }
      dispatch(commonActions.toggleSpinner(false));
      return response;
    } else {
      dispatch(commonActions.toggleSpinner(false));
      dispatch(errorsActions.set(error.message));
    }
  }
);

export { axiosRefreshToken, axiosDefault };
