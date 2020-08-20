import React from "react";
import "./Container.scss";

const Container = ({ children }) => {
  return <main className="container">{children}</main>;
};

export default Container;
