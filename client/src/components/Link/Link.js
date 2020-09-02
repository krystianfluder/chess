import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Link.scss";

const StyledLink = ({ variant, to, href, children }) => {
  const classes = ["link"];
  // variant
  if (!variant || variant === "primary") {
    classes.push("link--primary");
  } else if (variant === "secondary") {
    classes.push("link--secondary");
  }

  return (
    <>
      {to ? (
        <Link to={to} className="link">
          {children}
        </Link>
      ) : (
        <a href={href} className="link">
          {children}
        </a>
      )}
    </>
  );
};

StyledLink.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
};

export default StyledLink;
