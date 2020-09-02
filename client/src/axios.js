import { BACKEND_URL } from "./env";
import reduxStore from "./store";
import errorsActions from "./actions/error";
import authActions from "./actions/auth";
import { errorActions } from "./actions";

const axios = require("axios");

const axiosRefreshToken = axios.create({
  baseURL: BACKEND_URL,
});

const axiosDefault = axios.create({
  baseURL: BACKEND_URL,
});

axiosDefault.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { dispatch } = reduxStore;
    const { response } = error;

    if (response) {
      const { message } = response.data;
      const { url } = response.config;
      if (
        url === `${BACKEND_URL}/auth/login` ||
        url === `${BACKEND_URL}/auth/register`
      ) {
        dispatch(authActions.createErrorMessage(message));
      } else {
        dispatch(errorsActions.set(message));
      }
      return response;
    } else {
      dispatch(errorsActions.set(error.message));
    }
  }
);

axiosRefreshToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { dispatch, getState } = reduxStore;
    const { response } = error;

    if (response) {
      const { status, data, config } = response;
      const { message } = data;

      if (
        status === 401 &&
        message === "The token is invalid or has expired" &&
        config.data
      ) {
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
              error.response.data.message === "Incorrect refresh token"
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
      return response;
    } else {
      dispatch(errorsActions.set(error.message));
    }
  }
);

export { axiosRefreshToken, axiosDefault };
