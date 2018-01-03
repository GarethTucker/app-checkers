export default function(state=null, action){
    
        switch(action.type){
            case "SELECT_SQUARE":
                console.log(action.payload)
                return action.payload
        }
        return state;
    }