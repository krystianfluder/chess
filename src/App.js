import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.scss";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Auth from "./pages/Auth/Auth";
import Logout from "./pages/Auth/Logout";

import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  const profile = useSelector((state) => state.auth.profile);
  const error = useSelector((state) => state.error.error);
  useEffect(() => {
    console.log(profile, error);
  }, [profile, error]);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <li>
            <Link to="/auth/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/game">
        <Game />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/auth/logout">
        <Logout />
      </Route>
    </BrowserRouter>
  );
}

export default App;
