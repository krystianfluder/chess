import React from "react";
import "./ListGroup.scss";

const ListGroupItem = ({ children, active, disabled }) => {
  const classes = ["list-group__item"];
  if (active) {
    classes.push("list-group__item--active");
  }
  if (disabled) {
    classes.push("disabled");
  }

  return <li className={classes.join(" ")}>{children}</li>;
};

export default ListGroupItem;
