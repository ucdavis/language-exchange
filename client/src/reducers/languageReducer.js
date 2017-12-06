export default( state={
        fetching: false,
        fetched: false,
        languages: [],
        error: null
    }, action) => {
    switch (action.type){
        case "FETCH_LANGUAGE_START":
            state = {...state, fetching:true, languages : action.payload};
            break;        
        
        case "FETCH_LANGUAGE_ERROR":
            state =  {...state,fetching:false, error: action.payload};
            break;
        
        case "RECEIVE_LANGUAGE":
            state =  { ...state, fetching:false,fetched:true, languages : action.payload };
            break;
        default:
        return state;       
    }
    return state;
};