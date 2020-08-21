import React from "react";
import "../Game.scss";
import Board from "../../../components/Game/Board/Board";
import Figures from "./Figures";

const ChessBoard = () => {
  return (
    <div className="game__chess">
      <Figures />
      <Board />
    </div>
  );
};

export default ChessBoard;
