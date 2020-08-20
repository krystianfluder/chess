import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ variant, onClick, type, disabled, children }) => {
  const classes = ["button"];
  if (variant === "secondary") {
    classes.push("button--secondary");
  }
  if (variant === "close") {
    classes.push("button--close");
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
