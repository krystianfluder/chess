import React, { Component } from 'react';
import Figure from '../components/Figure';
import positions from '../components/positions';

export class Chessboard extends Component {
  state = {
    figures: [
      { position: "a1", figure: "wrook" },
      { position: "b1", figure: "wknight" },
      { position: "c1", figure: "wbishop" },
      { position: "d1", figure: "wqueen" },
      { position: "e1", figure: "wking" },
      { position: "f1", figure: "wbishop" },
      { position: "g1", figure: "wknight" },
      { position: "h1", figure: "wrook" },
      { position: "a2", figure: "wpawn" },
      { position: "b2", figure: "wpawn" },
      { position: "c2", figure: "wpawn" },
      { position: "d2", figure: "wpawn" },
      { position: "e2", figure: "wpawn" },
      { position: "f2", figure: "wpawn" },
      { position: "g2", figure: "wpawn" },
      { position: "h2", figure: "wpawn" },
      { position: "a7", figure: "bpawn" },
      { position: "b7", figure: "bpawn" },
      { position: "c7", figure: "bpawn" },
      { position: "d7", figure: "bpawn" },
      { position: "e7", figure: "bpawn" },
      { position: "f7", figure: "bpawn" },
      { position: "g7", figure: "bpawn" },
      { position: "h7", figure: "bpawn" }, 
      { position: "a8", figure: "brook" },
      { position: "b8", figure: "bknight" },
      { position: "c8", figure: "bbishop" },
      { position: "d8", figure: "bqueen" },
      { position: "e8", figure: "bking" },
      { position: "f8", figure: "bbishop" },
      { position: "g8", figure: "bknight" },
      { position: "h8", figure: "brook" },
    ]
  }
  render() {
    return (
      <div className="board">
        {this.state.figures.map((figure) =>
          <div key={figure.position} className="board__figure" style={positions[figure.position]}>
           <Figure figure={figure.figure} position={figure.position}/>
          </div>
        )}
      </div>
    );
  };
};

export default Chessboard;
