import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import selection from './selection';
import board from './board';
import dummy from './dummy';

const gameReducer = (state = {}, action) => {
  return {
    selection: selection(state.selection, action),
    board: board(state.board, action)
  }
}

const otherReducer = combineReducers({
  dummy
})

//export default reduceReducers(gameReducer, otherReducer)

export default gameReducer;
