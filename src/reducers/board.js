const defaultState = [
      [ null, "black",  null, "black", null, "black", null, "black" ]
    ,
      [ "black",  null, "black", null, "black", null, "black", null ]
    ,
      [ null, "black",  null, "black", null, "black", null, "black" ]
    ,
      [ null, null, null, null, null, null, null, null ]
    ,
      [ null, null, null, null, null, null, null, null ]
    ,
      [ "red", null, "red", null, "red", null, "red", null ]
    ,
      [ null, "red", null, "red", null, "red", null, "red" ]
    ,
      [ "red", null, "red", null, "red", null, "red", null ]
  ];

export default function(state=defaultState, {type, payload}, selection){
  switch(type){
    case "MOVE_TO": {
        let newState = [...state];
        let {row, column} = payload;
        newState[row][column] = checkForKing(row, state[selection.row][selection.column]);
        newState[selection.row][selection.column] = null
        return newState;
    }
    case "CAPTURE": {
        let newState = [...state];
        let {row, column} = payload;
        newState[row][column] = checkForKing(row, state[selection.row][selection.column]);
        newState[selection.row][selection.column] = null
        // Make the place you moved from null
        newState[(row + selection.row)/2][(column + selection.column)/2] = null
        return newState;
    }
    default:
        return state
  }
}

function checkForKing(row, color){

  if(row === 0 && color === "red"){
    return "redKing"
  }
  if(row === 7 && color === "black"){
    return "blackKing"
  }  
  return color
}
