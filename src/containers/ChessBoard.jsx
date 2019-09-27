import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import Field from '../components/Field';
import positions from '../assets/js/positions'
import boardBg from '../assets/img/boardBg.png';
import { figuresActions } from '../actions/index';

const styles = {
  backgroundImage: `url(${boardBg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

function ChessBoard({ figures, selected, tourPlayerOne, selectFigure, moveFigure }) {
  const boardRef = useRef();
  const findPosition = (e) => {
    function procent(procent) {
      if (procent >= 87.5) return "87.5%";
      else if (procent >= 75) return "75%";
      else if (procent >= 62.5) return "62.5%";
      else if (procent >= 50) return "50%";
      else if (procent >= 37.5) return "37.5%";
      else if (procent >= 25) return "25%";
      else if (procent >= 12.5) return "12.5%";
      else if (procent >= 0) return "0%";
      else return 0;
    }
    const { left, top, width, height } = boardRef.current.getBoundingClientRect();
    const x = e.clientX-left;
    const y = e.clientY-top;
    let procentX = (x/width)*100;
    let procentY = (y/height)*100;
    procentX = procent(procentX);
    procentY = procent(procentY);
    const positionsKeys = Object.keys(positions);
    const positionsValues = Object.values(positions);
    const searchIndex = positionsValues.findIndex((item) => (
      item.left === procentX && item.top === procentY
    ));
    return positionsKeys[searchIndex];
  }

  const onMouseMove = (e) => {
    let search = findPosition(e);
    const availableSelect = figures.findIndex((item) => 
      item.position === search && item.playerOne === tourPlayerOne
    );
    if(selected === null) {
      if(availableSelect !== -1)
        selectFigure(search);
    }
    else {
      if(selected !== search)
        moveFigure(search);
      else {
        selectFigure(search);
      }
    }   
  };
  return (
    <div className="board" style={styles} ref={boardRef} onClick={onMouseMove}>
      {figures.map((figure) =>
        <Field selected={selected} key={figure.position} position={figure.position}>
         <Figure figure={figure.figure} position={figure.position} playerOne={figure.playerOne}/>
        </Field>          
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  figures: state.figures.present.items,
  selected: state.figures.present.selected,
  tourPlayerOne: state.figures.present.tourPlayerOne,
});

const mapDispatchToProps = (dispatch) => ({
  selectFigure: position => dispatch(figuresActions.select(position)),
  moveFigure: position => dispatch(figuresActions.move(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
