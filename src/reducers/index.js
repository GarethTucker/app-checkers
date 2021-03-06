// import { combineReducers } from 'redux';
// import reduceReducers from 'reduce-reducers ';
import selection from './selection';
import board from './board';
import currentTurn from './currentTurn';
// import dummy from './dummy';

const gameReducer = (state = {}, action) => {
  return {
    selection: selection(state.selection, state.currentTurn, action),
    currentTurn: currentTurn(state.currentTurn, action),
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
  let filteredMoves = filterMoves(availableMoves)
  
  const grid = []
  for(let row=0; row<8; row++){
    const rowArray = []
    for(let col=0; col<8; col++){
      let currentColor = state.board[row][col]
      let currentMode = getMode(row, col, filteredMoves, currentColor, state.currentTurn)
      rowArray.push({
        color: currentColor,
        mode: currentMode
      })
    }
    grid.push(rowArray)
  }  
  return grid
}

function getMode(row, column, availableMoves, currentColor, currentTurn){
  for(let availableMove of availableMoves){
    if(availableMove.row === row && availableMove.column === column){
      return availableMove.mode
    }
  }
  if(isCurrentColorCurrentTurn(currentColor, currentTurn)){
    return currentColor
  }
  return "DEFAULT";
}

function isCurrentColorCurrentTurn(currentColor, currentTurn){
  if(currentColor === currentTurn){
    return true
  }
  else if(currentColor === "redKing" && currentTurn === "red"){
    return true
  }
  else if(currentColor === "blackKing" && currentTurn === "black"){
    return true
  }
}

function filterMoves(availableMoves){
  let filteredMoves = []
  let captureAvailable = false
  // check if there is a possiblity to take a piece and add those moves
  for(let move of availableMoves){
    if(move.mode === "AVAILABLE_CAPTURE"){
      captureAvailable = true
      filteredMoves.push(move)
    }
  }
  // if there is not capture avaiable add the simple moves
  if(!captureAvailable){
    filteredMoves.push(...availableMoves)
  }
  return filteredMoves
}

function getAvailableMoves({selection, board}){
  let availableMoves = []
  if(selection && board[selection.row][selection.column]){
    availableMoves.push({row: selection.row, column: selection.column, mode: "SELECTED"})

    let selectedColor = board[selection.row][selection.column]
    // get the moves avaialbe in the normal direction
    let goingUp = selectedColor=== "red" || selectedColor === "blackKing"
    var basicMoves = getBasicMoves(selection, goingUp, board, selectedColor)
    availableMoves.push(...basicMoves)
    // get the extra moves avaiable the other direction if a king is selected
    if(selectedColor === "blackKing" || selectedColor === "redKing"){
      basicMoves = getBasicMoves(selection, !goingUp, board, selectedColor)
      availableMoves.push(...basicMoves)
    }
  }  
  return availableMoves
}

function getBasicMoves(selection, goingUp, board, selectedColor){
  let basicMoves = []
  let simpleMoveLeft = getLeft(selection.row, selection.column, goingUp, board)
  let simpleMoveRight = getRight(selection.row, selection.column, goingUp, board)
  let oppositeColor = getOppositeColor(selectedColor)

  if(simpleMoveLeft && oppositeColor.includes(simpleMoveLeft.color)){
    let jumpLeft = getLeft(simpleMoveLeft.row, simpleMoveLeft.column, goingUp, board)
    if(jumpLeft && jumpLeft.color === null){
      basicMoves.push({row: jumpLeft.row, column: jumpLeft.column, mode: "AVAILABLE_CAPTURE"})
    }
  }
  if(simpleMoveRight && oppositeColor.includes(simpleMoveRight.color)){
    let jumpRight = getRight(simpleMoveRight.row, simpleMoveRight.column, goingUp, board)
    if(jumpRight && jumpRight.color === null){
      basicMoves.push({row: jumpRight.row, column: jumpRight.column, mode: "AVAILABLE_CAPTURE"})
    }
  }
  if(simpleMoveLeft && simpleMoveLeft.color === null){
    basicMoves.push({row: simpleMoveLeft.row, column: simpleMoveLeft.column, mode: "AVAILABLE_SIMPLE"})
  }
  if(simpleMoveRight && simpleMoveRight.color === null){
    basicMoves.push({row: simpleMoveRight.row, column: simpleMoveRight.column, mode: "AVAILABLE_SIMPLE"})
  }

  return basicMoves
}

function getOppositeColor(color){
  if(color === "red" || color === "redKing"){
    return ["black", "blackKing"]
  }
  if(color === "black" || color === "blackKing"){
    return ["red", "redKing"]
  }
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