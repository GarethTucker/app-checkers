import React, { Component } from 'react';
import Board from './Board';
import CurrentTurn from './CurrentTurn';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
        <CurrentTurn />
      </div>
    );
  }
}

export default App;
