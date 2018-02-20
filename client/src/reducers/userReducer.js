const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    cas_user:null,
    current : {},
    created : {},
    active : {},
    searchResult : [],
    error: null
  }

export default function userReducer(state=initialState, action) {

     switch (action.type){

    // FETCH MULTIPLE USERS
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
    // CREATE USER
        case "CREATE_USER_REJECTED":{
            state =  {...state, error: action.payload };
            break;
        }
        case "CREATE_USER_FULFILLED":{
            state =  { ...state, created : action.payload };
            break;
        }
    // FETCH SINGLE USER
        case "FETCH_USER_FULFILLED":{
            state = {...state, active : action.payload }
            break;
        }
        case "FETCH_USER_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
     // FETCH CURRENT USER
     case "FETCH_CURRENT_USER_FULFILLED":{
        state = {...state, current:action.payload }
        break;
    }
    case "FETCH_CURRENT_USER_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }    
    // UPDATE USER
        case "UPDATE_USER_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, active: action.payload };
            break;
        }
        case "UPDATE_USER_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
    // SEARCH USERS
        case "SEARCH_USERS_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "SEARCH_USERS_REJECTED":{
            state =  {...state, fetching: false, error: action.payload, searchResult : [] };
            break;
        }
        
        case "SEARCH_USERS_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, searchResult : action.payload };
            break;
        }

        default:
        return state;       
        }
        return state;
    };