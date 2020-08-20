import React from "react";
import "./ListGroup.scss";

const ListGroup = ({ children, variant, disabled }) => {
  const classes = ["list-group"];
  if (variant === "secondary") {
    classes.push("list-group--secondary");
  }
  if (disabled === true) {
    classes.push("disabled");
  }

  return <ul className={classes.join(" ")}>{children}</ul>;
};

export default ListGroup;
