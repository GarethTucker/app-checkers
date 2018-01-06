// import { combineReducers } from 'redux';
// import reduceReducers from 'reduce-reducers ';
import selection from './selection';
import board from './board';
// import dummy from './dummy';

const gameReducer = (state = {}, action) => {
  return {
    selection: selection(state.selection, action),
    board: board(state.board, action, state.selection)
  }
}

// const otherReducer = combineReducers({
//   dummy
// })

//export default reduceReducers(gameReducer, otherReducer)

export default gameReducer;

export const getBoardExtended = (state) => {
  const grid = []
  for(let row=0; row<8; row++){
    const rowArray = []
    for(let col=0; col<8; col++){
      let currentColor = state.board[row][col]
      let currentMode = getMode(row, col, state.selection, currentColor, state.board)
      rowArray.push({
        color: currentColor,
        mode: currentMode
      })
    }
    grid.push(rowArray)
  }  
  return grid
}

function getMode(row, col, selection, currentColor, currentBoard){
  if(selection && selection.row === row && selection.column === col){
     return "SELECTED"
  } 
  if (selection && isAvailable(row, col, selection, currentColor, currentBoard)) {
      return "AVAILABLE"
  }
  return "DEFAULT";
}

function isAvailable(row, col, selection, currentColor, currentBoard){
  let selectedColor = currentBoard[selection.row][selection.column]
  let availableSpace = diagonalPlusOne(row, col, selection, selectedColor, currentBoard)
  if(availableSpace){
    return !currentBoard[availableSpace.row][availableSpace.col]
  }
}

function diagonalPlusOne(row, col, selection, selectedColor, currentBoard){
  let availableSpace = null;
  if(selectedColor === "red"){
    if(selection.row - 1 === row && selection.column - 1 === col) {
      availableSpace = {row: selection.row -1, col: selection.column - 1}
    }
    if(selection.row - 1 === row && selection.column + 1 === col){
      availableSpace = {row: selection.row -1, col: selection.column + 1}
    }
  } else if(selectedColor === "black") {
    if(selection.row + 1 === row && selection.column - 1 === col){
      availableSpace = {row: selection.row + 1, col: selection.column - 1}
    }
    if(selection.row + 1 === row && selection.column + 1 === col){
      availableSpace = {row: selection.row + 1, col: selection.column + 1}
    }
  }
  return availableSpace
}