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
  if(selection){
    if(selection.row === row && selection.column === col){
      return "SELECTED"
    } 
    let selectedColor = currentBoard[selection.row][selection.column]
    if(selection.row === 0 && selectedColor === "red"){
      return "KING_RED"
    }
    if(selection.row === 7 && selectedColor === "black"){
      return "KING_BLACK"
    }
    const simpleMove = diagonalPlusOne(row, col, selection, selectedColor, currentBoard)
    if (simpleMove) {
      return "AVAILABLE_SIMPLE"
    }
    const capture = diagonalPlusTwo(row, col, selection, selectedColor, currentBoard)
    if (capture){
      return "AVAILABLE_CAPTURE"
    }
  }
  return "DEFAULT";
}

function diagonalPlusOne(row, col, selection, selectedColor, currentBoard){
  let availableSpace = checkColor("red", -1, row, col, selection, selectedColor, currentBoard)
  if(!availableSpace){
    availableSpace = checkColor("black", +1, row, col, selection, selectedColor, currentBoard)
  }

  if(availableSpace){
    if(!currentBoard[availableSpace.row][availableSpace.col]){
      return availableSpace
    }
  }
}

function checkColor(color, vertDiff, row, col, selection, selectedColor, currentBoard){
  let availableSpace = null;
  if(selectedColor === color){
    if(selection.row + vertDiff === row && selection.column - 1 === col){
      availableSpace = {row: selection.row + vertDiff, col: selection.column - 1}
    }
    if(selection.row + vertDiff === row && selection.column + 1 === col){
      availableSpace = {row: selection.row +vertDiff, col: selection.column + 1}
    }
  }
  return availableSpace
}

function diagonalPlusTwo(row, col, selection, selectedColor, currentBoard){
  let availableSpace = null;
  
  if(selectedColor === "red" && currentBoard[selection.row - 1][selection.column - 1] === "black"){
    if(selection.row - 2 === row && selection.column - 2 === col) {
      availableSpace = {row: selection.row - 2, col: selection.column - 2}
    }
  }
  if(selectedColor === "red" && currentBoard[selection.row - 1][selection.column + 1] === "black"){
    if(selection.row - 2 === row && selection.column + 2 === col) {
      availableSpace = {row: selection.row - 2, col: selection.column + 2}
    }
  }
  if(selectedColor === "black" && currentBoard[selection.row + 1][selection.column - 1] === "red"){
    if(selection.row + 2 === row && selection.column - 2 === col) {
      availableSpace = {row: selection.row + 2, col: selection.column - 2}
    }
  }
  if(selectedColor === "black" && currentBoard[selection.row + 1][selection.column + 1] === "red"){
    if(selection.row + 2 === row && selection.column + 2 === col) {
      availableSpace = {row: selection.row + 2, col: selection.column + 2}
    }
  }
  if(availableSpace){
    if(!currentBoard[availableSpace.row][availableSpace.col]){
      return availableSpace
    }
  }
}