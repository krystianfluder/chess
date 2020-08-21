import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Link.scss";

const StyledLink = ({ variant, to, children }) => {
  const classes = ["link"];
  // variant
  if (!variant || variant === "primary") {
    classes.push("link--primary");
  } else if (variant === "secondary") {
    classes.push("link--secondary");
  }

  return (
    <Link to={to} className="link">
      {children}
    </Link>
  );
};

StyledLink.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default StyledLink;
