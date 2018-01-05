export const selectSquare = (i,j) => {
    let payload = {
                row: i,
                column: j
              }
    return{
        type: "SELECT_SQUARE",
        payload: payload 
    }
};

export const moveTo = (i,j) => {
    let payload = {
                row: i,
                column: j
              }
    return{
        type: "MOVE_TO",
        payload: payload 
    }
};

export const deselectSquare = () => {
    
    return{
        type: "DESELECT_SQUARE"
    }
};