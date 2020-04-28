import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChessControl = () => {
  const figures = useSelector((state) => state.figures.present.items);
  const playerOneFigures = figures.filter((item) => item.playerOne === true);
  const playerTwoFigures = figures.filter((item) => item.playerOne !== true);

  const dispatch = useDispatch();
  const undo = () => dispatch({ type: "FIGURES_UNDO" });
  const redo = () => dispatch({ type: "FIGURES_REDO" });
  return (
    <div className="control">
      <button onClick={undo}>UNDO</button>
      <button onClick={redo}>REDO</button>
      Total: {figures ? figures.length : null}
      One: {playerOneFigures.length}
      Two: {playerTwoFigures.length}
      {/* One: {playerOneFigures.length}
      Two: {playerTwoFigures.length} */}
    </div>
  );
};

export default ChessControl;
