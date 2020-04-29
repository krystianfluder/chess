import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const ChessControl = () => {
  const canUndo = useSelector((state) => state.figures.past.length > 0);
  const canRedo = useSelector((state) => state.figures.future.length > 0);

  const dispatch = useDispatch();
  const undo = () => dispatch({ type: "FIGURES_UNDO" });
  const redo = () => dispatch({ type: "FIGURES_REDO" });

  return (
    <div className="control">
      <h2>Controls</h2>
      <Button onClick={undo} design="primary" disabled={!canUndo}>
        UNDO
      </Button>
      <Button onClick={redo} design="primary" disabled={!canRedo}>
        REDO
      </Button>
    </div>
  );
};

export default ChessControl;
