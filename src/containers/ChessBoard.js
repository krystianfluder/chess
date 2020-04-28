import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Figure from "../components/Figure";
import Field from "../components/Field";
import boardBg from "../assets/img/boardBg.png";
import { figuresActions } from "../actions";
import findPosition from "../util/findPosition";

const styles = {
  backgroundImage: `url(${boardBg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

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
    let search = findPosition(e, boardRef);
    const availableSelect = figures.findIndex(
      (item) => item.position === search && item.playerOne === tourPlayerOne
    );
    if (selected === null) {
      if (availableSelect !== -1) selectFigure(search);
    } else {
      if (selected !== search) moveFigure(search);
      else {
        selectFigure(search);
      }
    }
  };
  return (
    <div className="board" style={styles} ref={boardRef} onClick={onMouseMove}>
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
