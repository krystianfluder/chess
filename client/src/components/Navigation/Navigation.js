import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import "./Navigation.scss";
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
          <IoIosMenu size={32} />
        </li>
      </List>
      <List variant="horizontal" active>
        {children}
      </List>

      {modal ? (
        <Modal onClick={() => setModal(false)} variant="primary">
          <List>{children}</List>
        </Modal>
      ) : null}
    </nav>
  );
};

export default Navigation;
