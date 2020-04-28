import React from "react";
import { useDispatch } from "react-redux";

const ChessControl = () => {
  const dispatch = useDispatch();
  const undo = () => dispatch({ type: "FIGURES_UNDO" });
  const redo = () => dispatch({ type: "FIGURES_REDO" });
  return (
    <div className="control">
      <button onClick={undo}>UNDO</button>
      <button onClick={redo}>REDO</button>
    </div>
  );
};

export default ChessControl;
