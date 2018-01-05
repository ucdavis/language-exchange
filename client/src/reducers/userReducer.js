const initialState = {
    fetching: false,
    fetched: false,
    searchResult : [],
    users: [],
    current : {},
    created : {},
    active : {},
    error: null
  }

export default function userReducer(state=initialState, action) {

     switch (action.type){

        case "FETCH_USERS_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "FETCH_USERS_REJECTED":{
            state =  {...state,fetching: false, error: action.payload };
            break;
        }
        
        case "FETCH_USERS_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, users : action.payload };
            break;
        }

        case "CREATE_USER_REJECTED":{
            state =  {...state, error: action.payload };
            break;
        }
        
        case "CREATE_USER_FULFILLED":{
            state =  { ...state, created : action.payload };
            break;
        }

        case "FETCH_USER_FULFILLED":{
            state = {...state, active : action.payload,  title:action.payload.name}
            break;
        }
        case "FETCH_USER_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
        case "UPDATE_USER_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, active: action.payload };
            break;
        }

        case "UPDATE_USER_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }

        case "SEARCH_USERS_FULFILLED":{
            state = {...state,  searchResult : action.payload };
            break;
        }
        case "SEARCH_USERS_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }



        default:
        return state;       
        }
        return state;
    };