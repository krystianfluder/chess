import React from "react";
import styles from "./Lightbox.module.css";

const Lightbox = (props) => {
  return (
    <div onClick={props.onClick} className={styles.Lightbox}>
      {props.children}
    </div>
  );
};

export default Lightbox;
