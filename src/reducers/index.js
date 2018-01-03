import { combineReducers } from 'redux';
import selection from './selection';
import board from './board';
const checkersApp = combineReducers({
  selection,
  board
})

export default checkersApp
