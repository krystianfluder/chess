import { authTypes } from "../types";
import { errorActions, authActions } from ".";
import { BACKEND_URL } from "../env";
import storage from "../utils/storage";
import { axiosRefreshToken, axiosDefault } from "../axios";

const createErrorMessage = (errorMessage) => {
  return {
    type: authTypes.AUTH_CREATE_ERROR_MESSAGE,
    errorMessage,
  };
};

const removeErrorMessage = () => {
  return {
    type: authTypes.AUTH_REMOVE_ERROR_MESSAGE,
  };
};

const refreshTokenAction = (accessToken, refreshToken) => {
  return {
    type: authTypes.AUTH_REFRESH_TOKEN,
    accessToken,
    refreshToken,
  };
};

const refreshTokenAsync = (accessToken, refreshToken) => {
  return async (dispatch) => {
    const last = localStorage.getItem("auth");
    if (!last) {
      storage.save("auth", { accessToken, refreshToken });
    } else {
      const updatedAuth = JSON.parse(last);
      updatedAuth.accessToken = accessToken;
      updatedAuth.refreshToken = refreshToken;
      storage.save("auth", updatedAuth);
    }
    dispatch(refreshTokenAction(accessToken, refreshToken));
  };
};

const asyncFetchProfile = () => {
  return async (dispatch) => {
    const response = await axiosRefreshToken.get("/profile");
    if (response) {
      const { profile } = response.data;
      dispatch(fetchProfile(profile));
    }
  };
};

const fetchProfile = (profile) => {
  return {
    type: authTypes.AUTH_FETCH_PROFILE,
    profile,
  };
};

const fetchTokens = (tokens) => {
  return {
    type: authTypes.AUTH_FETCH_TOKENS,
    tokens,
  };
};

const fetchTokensAsync = () => {
  return async (dispatch) => {
    const response = await axiosRefreshToken.get("/auth/status");
    if (response) {
      dispatch(fetchTokens(response.data.refreshTokens));
    }
  };
};

const isLogin = () => {
  return async (dispatch) => {
    try {
      const auth = storage.get("auth");
      if (auth !== null) {
        const { accessToken, refreshToken } = auth;
        dispatch(refreshTokenAction(accessToken, refreshToken));
      }
    } catch (err) {
      dispatch(errorActions.set(err));
    }
  };
};

const logout = () => {
  return {
    type: authTypes.AUTH_LOGOUT,
  };
};

const logoutAsync = () => {
  return async (dispatch) => {
    storage.remove("auth");
    dispatch(logout());
  };
};

const logoutAsyncRemote = (refreshToken) => {
  return async (dispatch) => {
    await axiosRefreshToken.post("/auth/logout", {
      token: refreshToken,
    });
    dispatch(logoutAsync());
  };
};

const logoutAllAsync = () => {
  return async (dispatch) => {
    const response = await axiosRefreshToken.post("/auth/logout-all");

    if (response) {
      const { data, status } = response;
      const { message } = data;
      if (status === 200 && message === "User logged out successfully") {
        dispatch(logoutAsync());
      }
    }
  };
};

const loginAsync = ({ email, password }) => {
  return async (dispatch) => {
    const url = `${BACKEND_URL}/auth/login`;
    const response = await axiosDefault.post(url, {
      email,
      password,
    });

    if (response) {
      const { status, data } = response;
      const { message, accessToken, refreshToken } = data;

      if (status === 200 && message === "User logged in successfully") {
        dispatch(authActions.refreshTokenAsync(accessToken, refreshToken));
      }
    }
  };
};

const registerAsync = ({ email, password }) => {
  return async (dispatch) => {
    const url = `${BACKEND_URL}/auth/register`;
    const response = await axiosDefault.post(url, {
      email,
      password,
    });

    if (response) {
      const { status, data } = response;
      const { message, accessToken, refreshToken } = data;

      if (status === 200 && message === "User created in successfully") {
        dispatch(authActions.refreshTokenAsync(accessToken, refreshToken));
      }
    }
  };
};

export default {
  logout,
  logoutAsync,
  loginAsync,
  registerAsync,
  isLogin,
  createErrorMessage,
  removeErrorMessage,
  refreshTokenAction,
  fetchProfile,
  asyncFetchProfile,
  refreshTokenAsync,
  logoutAllAsync,
  fetchTokensAsync,
  logoutAsyncRemote,
};
