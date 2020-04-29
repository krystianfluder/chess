import React from "react";
import { useSelector } from "react-redux";

const ChessDashboard = () => {
  const figures = useSelector((state) => state.figures.present.items);
  const past = useSelector((state) => state.figures.past);
  console.log(past);
  const playerOneFigures = figures.filter((item) => item.playerOne === true);
  const playerTwoFigures = figures.filter((item) => item.playerOne !== true);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      Total: {figures ? figures.length : null}
      One: {playerOneFigures.length}
      Two: {playerTwoFigures.length}
    </div>
  );
};

export default ChessDashboard;
