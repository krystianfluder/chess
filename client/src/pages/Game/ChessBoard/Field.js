import React from "react";
import positions from "../../../assets/js/positions";

const Field = ({ position, children, selected }) => {
  if (selected === position) {
    return (
      <div
        className="game__figure game__figure--active"
        style={positions[position]}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="game__figure" style={positions[position]}>
      {children}
    </div>
  );
};

export default Field;
