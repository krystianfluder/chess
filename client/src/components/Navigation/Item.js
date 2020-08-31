import React from "react";
import { NavLink } from "react-router-dom";

const Item = (props) => {
  return (
    <li className="navigation__item">
      <NavLink className="navigation__link" to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;
