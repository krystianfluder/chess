import React from "react";
import ListGroup from "../../components/ListGroup/ListGroup";
import ListGroupItem from "../../components/ListGroup/ListGroupItem";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const figures = useSelector((state) => state.figures.present.items);
  const playerOneFigures = figures.filter((item) => item.playerOne === true);
  const playerTwoFigures = figures.filter((item) => item.playerOne !== true);

  return (
    <div className="game__dashboard">
      <h2>Dashboard</h2>
      <ListGroup>
        <ListGroupItem>Total: {figures ? figures.length : null}</ListGroupItem>
        <ListGroupItem>One: {playerOneFigures.length}</ListGroupItem>
        <ListGroupItem>Two: {playerTwoFigures.length}</ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Dashboard;
