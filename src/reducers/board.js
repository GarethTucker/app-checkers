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
        const newState = [...state];
        const {row, column} = payload;
        newState[row][column] = state[selection.row][selection.column];
        return newState;
    default:
        return state
  }
}
