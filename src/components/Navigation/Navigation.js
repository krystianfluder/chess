import React, { useState } from "react";
import "./Navigation.scss";
import Item from "./Item";
import List from "./List";
import Modal from "../Modal/Modal";

const Navigation = () => {
  const [modal, setModal] = useState(false);
  return (
    <nav className="navigation">
      {modal ? (
        <Modal onClick={() => setModal(false)}>
          <List modal>
            <Item modal to="/">
              Home
            </Item>
            <Item modal to="/game">
              Game
            </Item>
            <Item modal to="/auth">
              Auth
            </Item>
            <Item modal to="/auth/profile">
              Profile
            </Item>
            <Item modal to="/auth/logout">
              Logout
            </Item>
          </List>
        </Modal>
      ) : (
        <List>
          <li
            className="navigation__item navigation--burger"
            onClick={() => setModal(true)}
          >
            <i className="material-icons">menu</i>
          </li>
          <Item to="/">Home</Item>
          <Item to="/game">Game</Item>
          <Item to="/auth">Auth</Item>
          <Item to="/auth/profile">Profile</Item>
          <Item to="/auth/logout">Logout</Item>
        </List>
      )}
    </nav>
  );
};

export default Navigation;
