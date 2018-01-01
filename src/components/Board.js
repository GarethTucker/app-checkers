import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Board = ({myBoard}) => {
  let grid = []
  let button = null;

  for(let i=0; i<8; i++) {
      let row = []
      for(let j=0; j<8; j++) {

        if(i % 2 == j % 2) {
          button = <button className="square" style={blueStyle}></button>
        }
        else {
          button = <button className="square" style={greenStyle}></button>
        }
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

const blueStyle = {
  backgroundColor: 'blue'
}

const greenStyle = {
  backgroundColor: 'green'
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
