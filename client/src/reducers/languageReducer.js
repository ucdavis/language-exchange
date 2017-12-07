export default function( state={
        fetching: false,
        fetched: false,
        languages: [{
            "name": "New Language 1",
            "created_at": "2017-12-05T05:34:02.028Z",
            "updated_at": "2017-12-06T02:51:32.359Z",
            "id": 19
          },
          {
            "name": "New language 2",
            "created_at": "2017-12-05T05:33:28.389Z",
            "updated_at": "2017-12-06T02:51:50.132Z",
            "id": 20
          },
          {
            "name": "New language 13",
            "created_at": "2017-11-29T04:55:18.676Z",
            "updated_at": "2017-12-05T05:36:56.104Z",
            "id": 21
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