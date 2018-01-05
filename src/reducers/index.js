import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import selection from './selection';
import board from './board';
import dummy from './dummy';

const gameReducer = (state = {}, action) => {
  return {
    selection: selection(state.selection, action),
    board: board(state.board, action, state.selection)
  }
}

const otherReducer = combineReducers({
  dummy
})

//export default reduceReducers(gameReducer, otherReducer)

export default gameReducer;

export const getBoardExtended = (state) => {
  console.dir(state)
  const grid = []
  for(let row=0; row<8; row++){
    const rowArray = []
    for(let col=0; col<8; col++){
      let currentColor = state.board[row][col]
      let currentMode = getMode(row, col, state.selection, currentColor)
      rowArray.push({
        color: currentColor,
        mode: currentMode
      })
    }
    grid.push(rowArray)
  }  
  return grid
}

function getMode(row, col, selection, currentColor){
  if(selection && selection.row === row && selection.column === col){
     return "SELECTED"
  } 
  if (selection && currentColor === "red") {
      return "AVAILABLE"
  }
  return "DEFAULT";
}