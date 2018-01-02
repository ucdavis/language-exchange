const initialState = {
    fetching: false,
    fetched: false,
    providedLanguages: [],
    desiredLanguages: [],
    active : {},
    error: null
  }

export default function userReducer(state=initialState, action) {

     switch (action.type){

        case "FETCH_USER_PROVIDED_LANGUAGES_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "FETCH_USER_PROVIDED_LANGUAGES_REJECTED":{
            state =  {...state,fetching: false, error: action.payload };
            break;
        }
        
        case "FETCH_USER_PROVIDED_LANGUAGES_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, providedLanguages : action.payload };
            break;
        }

        case "FETCH_USER_DESIRED_LANGUAGES_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "FETCH_USER_DESIRED_LANGUAGES_REJECTED":{
            state =  {...state,fetching: false, error: action.payload };
            break;
        }
        
        case "FETCH_USER_DESIRED_LANGUAGES_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, desiredLanguages : action.payload };
            break;
        }

        // case "CREATE_USER_REJECTED":{
        //     state =  {...state, error: action.payload };
        //     break;
        // }
        
        // case "CREATE_USER_FULFILLED":{
        //     state =  { ...state, created : action.payload };
        //     break;
        // }

        // case "FETCH_USER_FULFILLED":{
        //     state = {...state, active : action.payload,  title:action.payload.name}
        //     break;
        // }
        // case "FETCH_USER_REJECTED":{
        //     state =  {...state, fetching: false, error: action.payload };
        //     break;
        // }
        // case "UPDATE_USER_FULFILLED":{
        //     state =  { ...state, fetching:false, fetched:true, active: action.payload };
        //     break;
        // }

        // case "UPDATE_USER_REJECTED":{
        //     state =  {...state, fetching: false, error: action.payload };
        //     break;
        // }

        // case "DELETE_USER_FULFILLED":{
        //     state =  { ...state, fetching:false, fetched:true, USERS : state.USERS.filter(val=>val !== state.active)};
        //     break;
        // }

        default:
        return state;       
        }
        return state;
    };