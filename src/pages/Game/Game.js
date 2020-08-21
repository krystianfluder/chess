import React from "react";
// import { useSelector } from "react-redux";
import Control from "./Control";
import Dashboard from "./Dashboard";
import "./Game.scss";
// import { Redirect } from "react-router-dom";
import ChessBoard from "./ChessBoard/ChessBoard";
import Layout from "../../components/Layout/Layout";

const Game = () => {
  // const profile = useSelector((state) => state.auth.profile);

  return (
    <>
      {/* {profile ? ( */}
      <Layout title="Game">
        <div className="game">
          <ChessBoard />
          <div className="game__info">
            <Control />
            <Dashboard />
          </div>
        </div>
      </Layout>
      {/* ) : (
        <Redirect to="/auth" />
      )} */}
    </>
  );
};

export default Game;
