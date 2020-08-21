import React from "react";

const List = ({ children, variant, active }) => {
  const classes = ["navigation__list"];
  // vertical
  if (!variant || variant === "vertical") {
    classes.push("navigation__list--vertical");
  } else if (variant === "horizontal") {
    classes.push("navigation__list--horizontal");
  }

  if (active) {
    classes.push("navigation__list--active");
  }
  return <ul className={classes.join(" ")}>{children}</ul>;
};

export default List;
