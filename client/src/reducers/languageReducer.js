export default function( state={
        fetching: false,
        fetched: false,
        languages: [{
            "name": "Arabic",
            "created_at": "2013-12-31T09:20:10.090Z",
            "updated_at": "2013-12-31T09:20:10.090Z",
            "id": 1
          },
          {
            "name": "Catalan",
            "created_at": "2013-12-31T09:20:10.100Z",
            "updated_at": "2013-12-31T09:20:10.100Z",
            "id": 2
          },
          {
            "name": "Chinese (Cantonese)",
            "created_at": "2013-12-31T09:20:10.108Z",
            "updated_at": "2013-12-31T09:20:10.108Z",
            "id": 3
          }],
        error: null
    }, action) {
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