import React from "react";
import "./Input.scss";

const Input = (props) => {
  const { onChange, onBlur, value, type, name } = props;
  return (
    <input
      className={"input"}
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default Input;
