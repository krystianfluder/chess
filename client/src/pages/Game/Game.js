import React from "react";
import "./Game.scss";

import Layout from "../../components/Layout/Layout";
import ChessBoard from "./ChessBoard/ChessBoard";
import Control from "./Control";
import Dashboard from "./Dashboard";

const Game = () => {
  return (
    <Layout title="Game" description="short description">
      <div className="game">
        <ChessBoard />
        <div className="game__info">
          <Control />
          <Dashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Game;
