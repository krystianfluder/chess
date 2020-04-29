import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const ChessControl = () => {
  const dispatch = useDispatch();
  const undo = () => dispatch({ type: "FIGURES_UNDO" });
  const redo = () => dispatch({ type: "FIGURES_REDO" });
  return (
    <div className="control">
      <Button onClick={undo} design="primary">
        UNDO
      </Button>
      <Button onClick={redo} design="primary">
        REDO
      </Button>
    </div>
  );
};

export default ChessControl;
