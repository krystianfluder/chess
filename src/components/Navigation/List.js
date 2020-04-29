import React from "react";

const List = (props) => {
  return (
    <ul className={props.modal ? "navigation__modal-list" : "navigation__list"}>
      {props.children}
    </ul>
  );
};

export default List;
