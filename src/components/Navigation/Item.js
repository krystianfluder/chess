import React from "react";
import { NavLink } from "react-router-dom";

const Item = (props) => {
  return (
    <li
      className={
        props.modal ? "navigation__item navigation--modal" : "navigation__item"
      }
    >
      <NavLink className="navigation__link" to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;
