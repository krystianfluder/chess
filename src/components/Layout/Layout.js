import React, { useEffect } from "react";

import PropTypes from "prop-types";

import "./Layout.scss";

const Layout = ({ children, title, description }) => {
  useEffect(() => {
    document.title = title;
  }, [title, description]);
  return (
    <main className="layout">
      <h1>{title}</h1>
      {children}
    </main>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Layout;
