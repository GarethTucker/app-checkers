import React from 'react';
import {connect} from 'react-redux';

function getStyle(i, j, myBoard){
  return {
        backgroundColor: i % 2 === j % 2 ? 'blue' :'green',
        border: '3px solid black'
        // border: square.piece ? '3px solid black' : '3px solid red'
  }
}

const Board = ({myBoard}) => {
  console.log(myBoard)
  let grid = []
  let button = null;
  

  for(let i=0; i<8; i++) {
    let row = []
    for(let j=0; j<8; j++) {
      let row1 = myBoard[i]
      let imageSrc = null
      if(row1){
        let square = myBoard[i][j]
        if(square){
          if(square.piece === "black"){
           imageSrc = "https://lh5.ggpht.com/K3F-iniKTYk-ZZZI6I2UWe64TqBQrjDEtlqTqu87d6xk7rJvX6ZMcXWa1NSRl7TSAw=w300"
          } else if (square.piece === "red"){
            imageSrc = "http://bristle.com/~michael/red-checker.png"  
          }
        }
      }
      button = <button 
        className="square" 
        style={getStyle(i, j, myBoard)} 
        onClick={() => handleClick(i, j, myBoard)}>        
        <img src={imageSrc} width="20" height="20" />
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
