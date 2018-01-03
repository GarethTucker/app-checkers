import { combineReducers } from 'redux';
import SelectSquare1 from './reducer-select-square';
import Board from './reducer-board';
const checkersApp = combineReducers({
  selectSquare: SelectSquare1,
  board: Board
  })

  export default checkersApp
