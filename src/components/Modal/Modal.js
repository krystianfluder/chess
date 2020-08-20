import React from "react";
import "./Modal.scss";
import Lightbox from "./Lightbox";

const Modal = ({ onClick, children, variant }) => {
  return (
    <Lightbox onClick={onClick} variant={variant}>
      <div className="modal">
        <button className="button button--close" onClick={onClick}>
          <i class="material-icons">close</i>
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </Lightbox>
  );
};

export default Modal;
