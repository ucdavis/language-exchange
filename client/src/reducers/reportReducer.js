const initialState = {
    fetching: false,
    totalLanguages: [],
    error: null
  }

export default function languageReducer(state=initialState, action) {

     switch (action.type){
// TOTAL LANGUAGES
        case "GET_TOTAL_LANGUAGES_PENDING":{
            state = {...state, fetching:true};
            break;
        }    

        case "GET_TOTAL_LANGUAGES_FULFILLED":{
            state =  { ...state, fetching:false, totalLanguages : action.payload };
            break;
        }   
        
        case "GET_TOTAL_LANGUAGES_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }

        default:
        return state;       
        }
        return state;
    };