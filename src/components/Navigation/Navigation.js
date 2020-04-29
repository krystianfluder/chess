import React from "react";
import "./Navigation.scss";
import Item from "./Item";

const Navigation = () => {
  return (
    <div>
      <nav className="navigation">
        <ul className="navigation--list">
          <Item to="/">Home</Item>
          <Item to="/game">Game</Item>
          <Item to="/auth">Auth</Item>
          <Item to="/auth/profile">Profile</Item>
          <Item to="/auth/logout">Logout</Item>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
