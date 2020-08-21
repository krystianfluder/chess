import React from "react";
import { useSelector } from "react-redux";
import Figures from "./Figures";
import Control from "./Control";
import Dashboard from "./Dashboard";
import "./Game.scss";
import { Redirect } from "react-router-dom";
import Board from "../../components/Game/Board/Board";

const Game = () => {
  // const profile = useSelector((state) => state.auth.profile);

  return (
    <>
      {/* {profile ? ( */}
      <div className="game">
        <div className="chess" style={{ position: "relative" }}>
          <Figures />
          <Board />
        </div>
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
