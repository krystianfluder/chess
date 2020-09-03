import React from "react";
import "./Lightbox.scss";

const Lightbox = ({ onClick, children, variant }) => {
  const classes = ["lightbox"];
  if (!variant || variant === "primary") {
    classes.push("lightbox--primary");
  } else if (variant === "secondary") {
    classes.push("lightbox--secondary");
  }

  return (
    <div onClick={onClick} className={classes.join(" ")}>
      {children}
    </div>
  );
};

export default Lightbox;
