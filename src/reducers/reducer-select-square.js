export default function(state=null, action){
    
        switch(action.type){
            case "SELECT_SQUARE":
                var i = action.payload.row;
                var j = action.payload.column;
                console.log(i, j)
                return state;
        }
        return state;
    }