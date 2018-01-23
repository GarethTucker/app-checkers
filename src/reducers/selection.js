export default function(state=null, currentTurn="red", action){
    switch(action.type){
        case "SELECT_SQUARE":
            if(currentColorIsCurrentTurn(action.payload.color, currentTurn)){
                return action.payload
            }
        case "DESELECT_SQUARE":
            return null
        case "MOVE_TO":
            return null
        case "CAPTURE":
            return null
        default:
            return state
    }
}

function currentColorIsCurrentTurn(currentColor, currentTurn){
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