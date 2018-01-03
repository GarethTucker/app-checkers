import { combineReducers } from 'redux';
import SelectSquare1 from './reducer-select-square';

const checkersApp = combineReducers({
  selectSquare: SelectSquare1
  })
  
  export default checkersApp