import React from "react";
import positions from "../assets/js/positions";

const Field = ({ position, children, selected }) => {
  console.log("render");
  if (selected === position) {
    return (
      <div
        className="figures__figure figures__figure--active"
        style={positions[position]}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="figures__figure" style={positions[position]}>
      {children}
    </div>
  );
};

export default Field;
