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