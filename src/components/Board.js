import React from 'react';
import {connect} from 'react-redux';

function getStyle(i, j, myBoard){
  return {
    backgroundColor: i % 2 === j % 2 ? 'blue' :'green',
    // border: myBoard[i][j] === undefined ? '2px solid black' : '2px solid red'
   }
}

const Board = ({myBoard}) => {
  let grid = []
  let button = null;

  for(let i=0; i<8; i++) {
    let row = []
    for(let j=0; j<8; j++) {
      button = <button 
        className="square" 
        style={getStyle(i, j, myBoard)} 
        onClick={() => handleClick(i, j, myBoard)}>
      </button>
      row.push(button)
    }
    grid.push(row)
  }

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

function handleClick(i, j, myBoard){
  console.log(i + ":" + j)
  let row = myBoard[i];
  console.log(row[j])
}

function mapStateToProps(state) {
    return {
      myBoard: state.board
    }
}

function mapDispatchToProps(dispatch) {
  return {
    mtoggle: function() {
      const action = {
        type: "TOGGLE_DIAGNOSTIC"
      };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
