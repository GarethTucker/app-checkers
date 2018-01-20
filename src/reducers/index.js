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
  let availableMoves = getAvailableMoves(state)
  
  const grid = []
  for(let row=0; row<8; row++){
    const rowArray = []
    for(let col=0; col<8; col++){
      let currentColor = state.board[row][col]
      let currentMode = getMode(row, col, availableMoves)
      rowArray.push({
        color: currentColor,
        mode: currentMode
      })
    }
    grid.push(rowArray)
  }  
  return grid
}

function getAvailableMoves({selection, board}){
  let availableMoves = []
  if(selection && board[selection.row][selection.column]){
    availableMoves.push({row: selection.row, column: selection.column, mode: "SELECTED"})
    let selectedColor = board[selection.row][selection.column]
  
    let goingUp = selectedColor=== "red" || selectedColor === "black-king"
    let basicMoves = getBasicMoves(selection, goingUp, board, selectedColor)
    availableMoves.push(...basicMoves)
    if(selectedColor === "black-king" || selectedColor === "red-king"){
      basicMoves = getBasicMoves(selection, !goingUp, board, selectedColor)
      availableMoves.push(...basicMoves)
    }
  }  
  return availableMoves
}

function getBasicMoves(selection, goingUp, board, selectedColor){
  let availableMoves = []
  let simpleMoveLeft = getLeft(selection.row, selection.column, goingUp, board)
  let simpleMoveRight = getRight(selection.row, selection.column, goingUp, board)
  let noCaptureAvailable = true
  let oppositeColor = getOppositeColor(selectedColor)

  if(oppositeColor.includes(simpleMoveLeft.color)){
    let jumpLeft = getLeft(simpleMoveLeft.row, simpleMoveLeft.column, goingUp, board)
    if(jumpLeft && jumpLeft.color === null){
      noCaptureAvailable = false
      availableMoves.push({row: jumpLeft.row, column: jumpLeft.column, mode: "AVAILABLE_CAPTURE"})
    }
  }
  if(oppositeColor.includes(simpleMoveRight.color)){
    let jumpRight = getRight(simpleMoveRight.row, simpleMoveRight.column, goingUp, board)
    if(jumpRight && jumpRight.color === null){
      noCaptureAvailable = false
      availableMoves.push({row: jumpRight.row, column: jumpRight.column, mode: "AVAILABLE_CAPTURE"})
    }
  }
  if(noCaptureAvailable){
    if(simpleMoveLeft.color === null){
      availableMoves.push({row: simpleMoveLeft.row, column: simpleMoveLeft.column, mode: "AVAILABLE_SIMPLE"})
    }
    if(simpleMoveRight.color === null){
      availableMoves.push({row: simpleMoveRight.row, column: simpleMoveRight.column, mode: "AVAILABLE_SIMPLE"})
    }
  }

  return availableMoves
}

function getOppositeColor(color){
  if(color === "red" || color === "red-king"){
    return ["black", "black-king"]
  }
  if(color === "black" || color === "black-king"){
    return ["red", "red-king"]
  }
}

function getMode(row, column, availableMoves){
  for(let current of availableMoves){
    if(current.row === row && current.column === column){
      return current.mode
    }
  }
  return "DEFAULT";
}

function getLeft(row, col, goingUp, currentBoard){
  if(goingUp && currentBoard[row-1]){
    return {row: row-1, column:col-1, color: currentBoard[row-1][col-1]}
  }
  else if(currentBoard[row+1]){
    return {row: row+1, column:col+1, color: currentBoard[row+1][col+1]}
  }
}

function getRight(row, col, goingUp, currentBoard, color){
  if(goingUp && currentBoard[row-1]){
    return {row: row-1, column:col+1, color: currentBoard[row-1][col+1]}
  }
  else if(currentBoard[row+1]){
    return {row: row+1, column:col-1, color: currentBoard[row+1][col-1]}
  }
}