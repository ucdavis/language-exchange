export default function(state=null, action){
    switch (action.type) {
        case "SHOW_LANGUAGE":{
            return action.payload;
            break;
        }
        default:state
    }
    return state;
   
}