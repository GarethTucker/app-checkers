export default function(state=null, action){
    switch(action.type){
        case "SELECT_SQUARE":
            return action.payload
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