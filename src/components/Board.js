import React from 'react';
import {connect} from 'react-redux';
import Square from './Square'
import {selectSquare, deselectSquare, moveTo} from '../actions/index';

function buildGrid(props){
  const grid = []
  for(let i=0; i<8; i++) {
    const row = []
    for(let j=0; j<8; j++) {
      row.push(<Square 
        {...props} 
        i={i} 
        j={j} 
        key={`${i}_${j}`}
      />)
    }
    grid.push(row)
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
      myBoard: state.board,
      selection: state.selection
    }
}

const mapDispatchToProps = {
  selectSquare,
  moveTo,
  deselectSquare
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
