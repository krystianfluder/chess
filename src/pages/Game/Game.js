import React from "react";
// import { useSelector } from "react-redux";
import Control from "./Control";
import Dashboard from "./Dashboard";
import "./Game.scss";
// import { Redirect } from "react-router-dom";
import ChessBoard from "./ChessBoard/ChessBoard";

const Game = () => {
  // const profile = useSelector((state) => state.auth.profile);

  return (
    <>
      {/* {profile ? ( */}
      <div className="game">
        <ChessBoard />
        <Control />
        <Dashboard />
      </div>
      {/* ) : (
        <Redirect to="/auth" />
      )} */}
    </>
  );
};

export default Game;
