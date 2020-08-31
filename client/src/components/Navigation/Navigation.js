import React, { useState } from "react";
import "./Navigation.scss";
import Item from "./Item";
import List from "./List";
import Modal from "../Modal/Modal";

const Navigation = ({ children }) => {
  const [modal, setModal] = useState(false);
  return (
    <nav className="navigation">
      <List variant="horizontal">
        <li
          className="navigation__item navigation__item--burger"
          onClick={() => setModal(true)}
        >
          <i className="material-icons">menu</i>
        </li>
      </List>
      <List variant="horizontal" active>
        {children}
      </List>

      {modal ? (
        <Modal onClick={() => setModal(false)} variant="secondary">
          <List>{children}</List>
        </Modal>
      ) : null}
    </nav>
  );
};

export default Navigation;
