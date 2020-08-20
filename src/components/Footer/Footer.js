import React from "react";
import "./Footer.scss";

import ListGroup from "../../components/ListGroup/ListGroup";
import ListGroupItem from "../../components/ListGroup/ListGroupItem";

const Footer = ({ children }) => {
  return (
    <footer className="footer">
      <ListGroup>
        <ListGroupItem>test</ListGroupItem>
        <ListGroupItem>test</ListGroupItem>
        <ListGroupItem>test</ListGroupItem>
      </ListGroup>
    </footer>
  );
};

export default Footer;
