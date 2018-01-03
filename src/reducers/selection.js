export default function(state={ selection: null }, action){
    
        switch(action.type){
            case "SELECT_SQUARE":
                console.log(action.payload)
                return { selection: action.payload }
        }
        return state;
    }