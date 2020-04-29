import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Figure from "../../components/Figure";
import Field from "../../components/Field";
import { figuresActions } from "../../actions";
import findPosition from "../../assets/js/findPosition";

const ChessBoard = () => {
  const boardRef = useRef();
  const dispatch = useDispatch();
  const figures = useSelector((state) => state.figures.present.items);
  const selected = useSelector((state) => state.figures.present.selected);
  const tourPlayerOne = useSelector(
    (state) => state.figures.present.tourPlayerOne
  );

  const selectFigure = (figure) => {
    dispatch(figuresActions.select(figure));
  };
  const moveFigure = (figure) => {
    dispatch(figuresActions.move(figure));
  };

  const onMouseMove = (e) => {
    let currentFigure = findPosition(e, boardRef);
    const availableSelect = figures.findIndex(
      (item) =>
        item.position === currentFigure && item.playerOne === tourPlayerOne
    );
    if (selected === null) {
      if (availableSelect !== -1) selectFigure(currentFigure);
    } else {
      if (selected !== currentFigure) moveFigure(currentFigure);
      else {
        selectFigure(currentFigure);
      }
    }
  };
  return (
    <div className="figures" ref={boardRef} onClick={onMouseMove}>
      {figures.map((figure) => (
        <Field
          selected={selected}
          key={figure.position}
          position={figure.position}
        >
          <Figure
            figure={figure.figure}
            position={figure.position}
            playerOne={figure.playerOne}
          />
        </Field>
      ))}
    </div>
  );
};

export default ChessBoard;