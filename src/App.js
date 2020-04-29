import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";

import { authActions, errorActions } from "./actions";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Auth/Profile";
import Logout from "./pages/Auth/Logout";

import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Modal from "./components/Modal/Modal";

function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const error = useSelector((state) => state.error.error);
  const removeError = () => {
    dispatch(errorActions.remove());
  };
  useEffect(() => {
    dispatch(authActions.isLogin());
  });
  useEffect(() => {
    console.log(profile, error);
  }, [profile, error]);
  return (
    <BrowserRouter>
      <Navigation />
      {error ? (
        <Modal onClick={removeError}>{JSON.stringify(error)}</Modal>
      ) : null}
      <main>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/game" exact>
          <Game />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/auth/profile" exact>
          <Profile />
        </Route>
        <Route path="/auth/logout" exact>
          <Logout />
        </Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
