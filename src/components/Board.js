import React from 'react';
import {connect} from 'react-redux';

function getStyle(i, j, myBoard){
  let boarderStyle = '2px solid black'
  return {
        backgroundColor: i % 2 === j % 2 ? 'blue' :'green',
        border: boarderStyle
        // border: square.piece ? '3px solid black' : '3px solid red'
  }
}

function buildGrid(myBoard, selectSquare){
  let grid = []
  let button = null;
  for(let i=0; i<8; i++) {
    let row = []
    for(let j=0; j<8; j++) {
      let imageSrc = null
      let square = myBoard[i][j]
      if(square.piece === "black"){
        imageSrc = "https://lh5.ggpht.com/K3F-iniKTYk-ZZZI6I2UWe64TqBQrjDEtlqTqu87d6xk7rJvX6ZMcXWa1NSRl7TSAw=w300"
      } else if (square.piece === "red"){
        imageSrc = "http://bristle.com/~michael/red-checker.png"  
      }
      button = <button 
        className="square" 
        style={getStyle(i, j, myBoard)} 
        onClick={() => selectSquare(i, j)}>   
        <img src={imageSrc} width="20" height="20" />    
      </button>
      row.push(button)
    }
    grid.push(row)
  }
  return grid
}

const Board = ({myBoard, selectSquare}) => {
  console.log(myBoard)
  let grid = buildGrid(myBoard, selectSquare)

  return(
    <div>
      <h2>BOARD</h2>
      <div className="board-row">
        { grid[0] }
      </div>
      <div className="board-row">
        { grid[1] }
      </div>
      <div className="board-row">
        { grid[2] }
      </div>
      <div className="board-row">
        { grid[3] }
      </div>
      <div className="board-row">
        { grid[4] }
      </div>
      <div className="board-row">
        { grid[5] }
      </div>
      <div className="board-row">
        { grid[6] }
      </div>
      <div className="board-row">
        { grid[7] }
      </div>      
    </div>
  ); 
}

function mapStateToProps(state) {
    return {
      myBoard: state.board
    }
}

function mapDispatchToProps(dispatch) {
  return {
    selectSquare: function(i,j) {
      let payload = {
        row: i,
        column: j
      }
      const action = {
        type: "SELECT_SQUARE",
        payload: payload
      };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
