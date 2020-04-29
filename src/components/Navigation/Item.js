import React from "react";
import { NavLink } from "react-router-dom";

const Item = (props) => {
  return (
    <li className="navigation--item">
      <NavLink className="navigation--link" to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;
