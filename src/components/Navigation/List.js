import React from "react";

const List = ({ children, variant, active }) => {
  const classes = ["navigation__list"];
  if (variant === "horizontal") {
    classes.push("navigation__list--horizontal");
  }
  if (active) {
    classes.push("navigation__list--active");
  }
  return <ul className={classes.join(" ")}>{children}</ul>;
};

export default List;
