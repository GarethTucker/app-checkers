import React from 'react';
import {connect} from 'react-redux';
import Square from './Square'
import {selectSquare, deselectSquare, moveTo, capture} from '../actions/index';
import { getBoardExtended } from '../reducers/index';

function buildGrid(props){
  const grid = []
  for(let row=0; row<8; row++) {
    const rowArray = []
    for(let col=0; col<8; col++) {
      rowArray.push(<Square 
        {...props} 
        row={row} 
        col={col} 
        key={`${row}_${col}`}
      />)
    }
    grid.push(rowArray)
  }
  return grid
}

const Board = (props) => {
  
  let grid = buildGrid(props)

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
      // myBoard: state.board,
      myBoard: getBoardExtended(state),
      selection: state.selection
    }
}

const mapDispatchToProps = {
  selectSquare,
  moveTo,
  capture,
  deselectSquare
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
