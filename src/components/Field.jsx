import React from "react";
import positions from "../util/positions";

function Field({ position, children, selected }) {
  if (selected === position) {
    return (
      <div
        className="board__figure board__figure--active"
        style={positions[position]}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="board__figure" style={positions[position]}>
      {children}
    </div>
  );
}

export default Field;
