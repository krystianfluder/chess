import React from "react";
import "./Input.scss";

const Input = ({ onChange, onBlur, value, type, name, label }) => {
  return (
    <label className="input">
      {label}
      <input
        className={"input__element"}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </label>
  );
};

export default Input;
