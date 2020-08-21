import React from "react";
import "./ListGroup.scss";

const ListGroup = ({ children, variant, disabled }) => {
  const classes = ["list-group"];
  // vertical
  if (!variant || variant === "vertical") {
    classes.push("list-group--vertical");
  } else if (variant === "horizontal") {
    classes.push("list-group--horizontal");
  }

  if (disabled === true) {
    classes.push("disabled");
  }

  return <ul className={classes.join(" ")}>{children}</ul>;
};

export default ListGroup;
