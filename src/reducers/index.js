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
    let simpleMoveLeft = getLeft(selection.row, selection.column, goingUp, board)
    let simpleMoveRight = getRight(selection.row, selection.column, goingUp, board)
    let noCaptureAvailable = true
    let oppositeColor = getOppositeColor(selectedColor)
    if(simpleMoveLeft.color === oppositeColor){
      let jumpLeft = getLeft(simpleMoveLeft.row, simpleMoveLeft.column, goingUp, board)
      if(jumpLeft && jumpLeft.color === null){
        noCaptureAvailable = false
        availableMoves.push({row: jumpLeft.row, column: jumpLeft.column, mode: "AVAILABLE_CAPTURE"})
      }
    }
    if(simpleMoveRight.color === oppositeColor){
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
  }  
  return availableMoves
}

function getOppositeColor(color){
  if(color === "red"){
    return "black"
  }
  if(color === "black"){
    return "red"
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