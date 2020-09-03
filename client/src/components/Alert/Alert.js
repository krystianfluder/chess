import React from "react";
import { IoIosClose } from "react-icons/io";
import "./Alert.scss";

const Alert = ({ onClick, children }) => {
  return (
    <div className="alert">
      <div className="alert__body">
        <h2>Message</h2>
        {children}close
      </div>
      <div className="alert__close">
        <IoIosClose size={50} onClick={onClick} />
      </div>
    </div>
  );
};

export default Alert;
