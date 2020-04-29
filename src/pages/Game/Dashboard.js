import React from "react";
import { useSelector } from "react-redux";
import Board from "../../components/Game/Board";

const ChessDashboard = () => {
  const figures = useSelector((state) => state.figures.present.items);
  const past = useSelector((state) => state.figures.past);
  console.log(past);
  const playerOneFigures = figures.filter((item) => item.playerOne === true);
  const playerTwoFigures = figures.filter((item) => item.playerOne !== true);

  return (
    <div className="dashboard">
      Total: {figures ? figures.length : null}
      One: {playerOneFigures.length}
      Two: {playerTwoFigures.length}
      {/* {past.map((item) => (
        <div>{item}</div>
      ))} */}
    </div>
  );
};

export default ChessDashboard;
