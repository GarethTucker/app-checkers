export default function(state=null, action){
    switch(action.type){
        case "SELECT_SQUARE":
            return action.payload
        case "DESELECT_SQUARE":
            return null
        case "MOVE_TO":
            return null
        default:
            return state
    }
}