export default function(state=null, currentTurn="red", action){
    switch(action.type){
        case "SELECT_SQUARE":
            if(action.payload.color === currentTurn){
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