import React from "react";
import svg from "./board.svg";

const Board = () => {
  return (
    <img
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        zIndex: -1,
      }}
      src={svg}
      alt="board"
    />
  );
};

export default Board;
