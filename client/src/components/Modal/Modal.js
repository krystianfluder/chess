import React from "react";
import { IoIosClose } from "react-icons/io";
import "./Modal.scss";
import Lightbox from "./Lightbox";

const Modal = ({ onClick, children, variant }) => {
  return (
    <Lightbox onClick={onClick} variant={variant}>
      <div className="modal">
        <IoIosClose size={50} className="modal__close" />
        <div className="modal__body">{children}</div>
      </div>
    </Lightbox>
  );
};

export default Modal;
