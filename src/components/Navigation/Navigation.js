import React, { useState } from "react";
import "./Navigation.scss";
import Item from "./Item";
import Modal from "../Modal/Modal";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <nav className="navigation">
        {modal ? (
          <Modal onClick={() => setModal(false)}>
            <ul className="navigation__modal-list">
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
            </ul>
          </Modal>
        ) : (
          <ul className="navigation__list">
            <li
              className="navigation__item navigation--burger"
              onClick={() => setModal(true)}
            >
              <i class="material-icons">menu</i>
            </li>
            <Item to="/">Home</Item>
            <Item to="/game">Game</Item>
            <Item to="/auth">Auth</Item>
            <Item to="/auth/profile">Profile</Item>
            <Item to="/auth/logout">Logout</Item>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
