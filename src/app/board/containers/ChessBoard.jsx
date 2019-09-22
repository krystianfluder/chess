import React, { Component } from 'react';
import Figure from '../components/Figure';
import Field from '../components/Field';
import positions from '../components/positions';
import boardBg from '../../../assets/img/boardBg.png';

const styles = {
  backgroundImage: `url(${boardBg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

export class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }
  state = {
    player: 1,
    selected: null,
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
  
  onMouseMove = (e) => {
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
    const { left, top, width, height } = this.boardRef.current.getBoundingClientRect();
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
    let search = positionsKeys[searchIndex];
      
    let oneSelected = this.state.figures.find((item) => 
      item.selected === true
    )

    let changePosition = null;

    let figures = this.state.figures.map((item) => {
      if(item.position===search && item.selected) {
        return { ...item, selected: false };
      }
      else if(item.position===search) {
        return { ...item, selected: true };
      } else if(oneSelected && oneSelected.position === item.position && item.position!==search) {    
        changePosition = search;
      }
      return { ...item, selected: false };
    });

    if(changePosition) {      
      figures = figures.filter((item) => {
        return changePosition !== item.position; 
      });
      figures = figures.map((item) => {
        if(oneSelected.position === item.position) {
          return { ...item, selected: false, position: changePosition }
        }
        return { ...item, selected: false }
      })
      search = null;
    }
    this.setState({figures, selected: search});
  }

  onFigure = (e) => {

  }

  render() {
    return (
      <div className="board" style={styles} ref={this.boardRef} onClick={this.onMouseMove}>
        {this.state.figures.map((figure) =>
          <Field selected={figure.selected} key={figure.position} onFigure={this.onFigure} position={figure.position}>
           <Figure figure={figure.figure} position={figure.position}/>
          </Field>          
        )}
      </div>
    );
  };
};

export default ChessBoard;
