import { authTypes } from "../types";
import { errorActions, authActions } from "../actions";
import { API_KEY } from "../env";

const isLogin = () => {
  return async (dispatch) => {
    try {
      const profile = localStorage.getItem("profile");
      console.log(profile);
      if (profile !== null) {
        dispatch(login(profile));
      }
    } catch (err) {
      dispatch(errorActions.set(err));
    }
  };
};

const logout = () => {
  return {
    type: authTypes.logout,
  };
};

const logoutAsync = () => {
  return async (dispatch) => {
    localStorage.removeItem("profile");
    dispatch(logout());
  };
};

const login = (profile) => {
  return {
    type: authTypes.login,
    profile,
  };
};

const loginAsync = (data) => {
  return async (dispatch) => {
    const { email, password } = data;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        dispatch(errorActions.set(responseJson.error));
      } else {
        localStorage.setItem("profile", JSON.stringify(responseJson));
        dispatch(authActions.login(responseJson));
      }
    } catch (err) {
      dispatch(errorActions.set(err));
    }
  };
};

export default {
  logout,
  logoutAsync,
  login,
  loginAsync,
  isLogin,
};
