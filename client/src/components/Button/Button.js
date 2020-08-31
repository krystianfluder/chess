import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ variant, onClick, type, disabled, children }) => {
  const classes = ["btn"];
  // variant
  if (!variant || variant === "primary") {
    classes.push("btn--primary");
  } else if (variant === "secondary") {
    classes.push("btn--secondary");
  } else if (variant === "close") {
    classes.push("btn--close");
  }

  return (
    <button
      className={classes.join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default Button;
