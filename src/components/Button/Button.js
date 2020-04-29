import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      className={["button", `button--${props.design}`].join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  design: PropTypes.string,
};

export default Button;
