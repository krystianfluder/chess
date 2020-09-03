import React from "react";
import "./Modal.scss";
import Lightbox from "./Lightbox";

const Modal = ({ onClick, children, variant }) => {
  // console.log(variant);
  // const classes = ["btn"];
  // // variant
  // if (!variant || variant === "primary") {
  //   classes.push("lightbox--primary");
  // } else if (variant === "secondary") {
  //   classes.push("lightbox--secondary");
  // }

  return (
    <Lightbox onClick={onClick} variant={variant}>
      <div className="modal">
        <button className="btn btn--close" onClick={onClick}></button>
        <div className="modal__body">{children}</div>
      </div>
    </Lightbox>
  );
};

export default Modal;
