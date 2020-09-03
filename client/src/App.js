import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";

import { errorActions, commonActions } from "./actions";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Auth/Logout";
import NewPassword from "./pages/Auth/NewPassword";

import Item from "./components/Navigation/Item";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Modal from "./components/Modal/Modal";
import Footer from "./components/Footer/Footer";

const NavigationContainer = ({ accessToken }) => {
  return (
    <Navigation>
      <Item to="/">Home</Item>
      {accessToken ? (
        <>
          <Item to="/game">Game</Item>
          <Item to="/profile">Profile</Item>
          <Item to="/logout">Logout</Item>
        </>
      ) : (
        <>
          <Item to="/auth">Auth</Item>
        </>
      )}
    </Navigation>
  );
};

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const error = useSelector((state) => state.error.error);
  const message = useSelector((state) => state.common.message);

  const removeError = () => {
    dispatch(errorActions.remove());
  };

  const removeMessage = () => {
    dispatch(commonActions.removeMessage());
  };

  return (
    <BrowserRouter>
      {error ? (
        <Modal onClick={removeError}>{JSON.stringify(error)}</Modal>
      ) : null}

      <div className="content">
        <NavigationContainer accessToken={accessToken} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/game" exact>
            {accessToken ? <Game /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/profile" exact>
            {accessToken ? <Profile /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/logout" exact>
            {accessToken ? <Logout /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/auth" exact>
            {!accessToken ? <Auth /> : <Redirect to="/game" />}
          </Route>
          <Route path="/auth/new-password">
            {!accessToken ? <NewPassword /> : <Redirect to="/game" />}
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
