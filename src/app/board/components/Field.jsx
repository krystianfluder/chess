import React from 'react'
import positions from './positions';

function Field({ position, children, onFigure, selected }) { 
  if(selected) {
    return (
      <div onClick={onFigure} className="board__figure board__figure--active" style={positions[position]}>
        {children}
      </div>
    );
  }

  return (
    <div onClick={onFigure} className="board__figure" style={positions[position]}>
      {children}
    </div>
  );
};

export default Field;
