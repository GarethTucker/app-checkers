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

export default function(state=defaultState, action){
  return state;
}
