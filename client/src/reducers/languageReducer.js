const initialState = {
    fetching: false,
    fetched: false,
    languages: [],
    active :{},
    error: null
  }

export default function languageReducer(state=initialState, action) {

     switch (action.type){
        case "FETCH_LANGUAGES":{
            state = {...state, fetching:true}
            break;
        }  
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
            state = {...state, active : action.payload}
            break;
        }
        default:
        return state;       
        }
        return state;
    };