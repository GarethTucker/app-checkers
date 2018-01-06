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

export const capture = (row, col) => {
    let payload = {
                row1: row,
                column1: col
              }
    return{
        type: "CAPTURE",
        payload: payload 
    }
};

export const deselectSquare = () => {
    
    return{
        type: "DESELECT_SQUARE"
    }
};