import React from "react";

import { Bishop, King, Knight, Pawn, Queen, Rook } from "./figures";

function Figure({ figure, playerOne }) {
  const classicBlack = {
    primary: "#555",
    secondary: "#000",
  };

  const classicWhite = {
    primary: "#fff",
    secondary: "#000",
  };

  if (playerOne) {
    switch (figure) {
      case "rook":
        return <Rook colors={classicWhite} />;
      case "knight":
        return <Knight colors={classicWhite} />;
      case "bishop":
        return <Bishop colors={classicWhite} />;
      case "queen":
        return <Queen colors={classicWhite} />;
      case "king":
        return <King colors={classicWhite} />;
      case "pawn":
        return <Pawn colors={classicWhite} />;
      default:
        return <>error</>;
    }
  }

  switch (figure) {
    case "rook":
      return <Rook colors={classicBlack} />;
    case "knight":
      return <Knight colors={classicBlack} />;
    case "bishop":
      return <Bishop colors={classicBlack} />;
    case "queen":
      return <Queen colors={classicBlack} />;
    case "king":
      return <King colors={classicBlack} />;
    case "pawn":
      return <Pawn colors={classicBlack} />;
    default:
      return <>error</>;
  }
}

export default Figure;
