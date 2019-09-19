import React from 'react';

import { 
  BlackBishop,
  BlackKing,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
} from './figures';

function Figure({ figure }) {
  switch(figure) {
    case "wrook":
      return <WhiteRook/>
    case "wknight":
      return <WhiteKnight/>
        // <div className="board__figure" style={positions[position]}>
          
        // </div>
      
    case "wbishop":
      return <WhiteBishop/>
    case "wqueen":
      return <WhiteQueen/>
    case "wking":
      return <WhiteKing/>
    case "wpawn":
      return <WhitePawn/>
    case "brook":
      return <BlackRook/>
    case "bknight":
      return <BlackKnight/>
    case "bbishop":
      return <BlackBishop/>
    case "bqueen":
      return <BlackQueen/>
    case "bking":
      return <BlackKing/>
    case "bpawn":
      return <BlackPawn/>
    default:
      return <>error</>
  }
}

export default Figure;