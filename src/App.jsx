import React from 'react';
import './App.scss';
import ChessBoard from './containers/ChessBoard';
import ChessControl from './containers/ChessControl';

function App() {
  return (
    <div className="game">
      <ChessBoard/>
      <ChessControl/>
    </div>
  );
};

export default App;