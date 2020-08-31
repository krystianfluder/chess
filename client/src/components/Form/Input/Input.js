import React from "react";
import "./Input.scss";

const Input = ({
  onChange,
  onBlur,
  value,
  type,
  name,
  label,
  errorMessage,
  placeholder,
}) => {
  const classes = ["input__element"];
  if (errorMessage) {
    classes.push("input__element--invalid");
  }
  return (
    <label className="input">
      {label}
      <input
        placeholder={placeholder}
        className={classes.join(" ")}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <div className="input__error-message">{errorMessage}</div>
    </label>
  );
};

export default Input;
