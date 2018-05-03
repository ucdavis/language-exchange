const initialState = {
    fetching: false,
    updating: false,
    fetched: false,
    languages: [],
    active :{},
    error: null
  }

export default function languageReducer(state=initialState, action) {

     switch (action.type){

        case "FETCH_LANGUAGES_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "FETCH_LANGUAGES_REJECTED":{
            state =  {...state,fetching: false, error: action.payload };
            break;
        }
        
        case "FETCH_LANGUAGES_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, languages : action.payload };
            break;
        }

        case "FETCH_LANGUAGE_FULFILLED":{
            state = {...state, active : action.payload, fetching: false}
            break;
        }
        case "FETCH_LANGUAGE_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
        case "UPDATE_LANGUAGE_PENDING":{
            state =  { ...state, updating:true};
            break;
        }
        case "UPDATE_LANGUAGE_FULFILLED":{
            state =  { ...state, updating:false, active: action.payload };
            break;
        }

        case "UPDATE_LANGUAGE_REJECTED":{
            state =  {...state, updating: false, error: action.payload };
            break;
        }

        case "DELETE_LANGUAGE_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, languages : state.languages.filter(val=>val !== state.active)};
            break;
        }


        default:
        return state;       
        }
        return state;
    };