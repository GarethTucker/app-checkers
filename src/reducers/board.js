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
    case "MOVE_TO":
        let newState = [...state];
        let {row, column} = payload;
        newState[row][column] = getNewColor(row, state[selection.row][selection.column]);
        newState[selection.row][selection.column] = null
        return newState;
      case "CAPTURE":
        newState = [...state];
        let {row1, column1} = payload;
        newState[row1][column1] = getNewColor(row1, state[selection.row][selection.column]);
        newState[selection.row][selection.column] = null
        newState[(row1 + selection.row)/2][(column1 + selection.column)/2] = null
        return newState;
    default:
        return state
  }
}

function getNewColor(row, color){

  if(row === 0 && color === "red"){
    return "red-king"
  }
  if(row === 7 && color === "black"){
    return "black-king"
  }  
  return color
}
