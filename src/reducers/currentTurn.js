const defaultState = "red";

export default function(state=defaultState, action){
    switch(action.type){
      case "MOVE_TO":
          return oppositeColor(state);
      case "CAPTURE":
          return oppositeColor(state);
      default:
          return state
    }
}

function oppositeColor(currentColor){
    if(currentColor === "red"){
        return "black"
    }
    return "red"
}