import React from "react";
import styles from "./Modal.module.css";
import Lightbox from "./Lightbox";

const Modal = (props) => {
  return (
    <Lightbox onClick={props.onClick}>
      <div className={styles.Wrapper}>
        <div className={styles.Modal}>
          <button onClick={props.onClick}>
            <i class="material-icons">close</i>
          </button>
          {props.children}
        </div>
      </div>
    </Lightbox>
  );
};

export default Modal;
