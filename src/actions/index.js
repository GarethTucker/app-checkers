export const selectSquare = (row, column, color) => {
    let payload = {
                row: row,
                column: column,
                color: color
              }
    return{
        type: "SELECT_SQUARE",
        payload: payload 
    }
};

export const moveTo = (row,column) => {
    let payload = {
                row: row,
                column: column
              }
    return{
        type: "MOVE_TO",
        payload: payload 
    }
};

export const capture = (row, col) => {
    let payload = {
                row: row,
                column: col
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