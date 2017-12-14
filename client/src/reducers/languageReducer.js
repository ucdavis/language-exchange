const initialState = {
    fetching: false,
    fetched: false,
    languages: [],
    active :{},
    title: '',
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
            state = {...state, active : action.payload,  title:action.payload.name}
            break;
        }
        case "FETCH_LANGUAGE_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
        case "UPDATE_LANGUAGE_FULFILLED":{
            state =  { ...state, fetching:false, fetched:true, title:action.payload.name, active: action.payload };
            break;
        }

        case "UPDATE_LANGUAGE_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
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