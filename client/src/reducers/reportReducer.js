const initialState = {
    fetching: false,
    totalUsersPerLanguages: [],
    totalUsersPerYear: [],
    error: null
  }

export default function languageReducer(state=initialState, action) {

     switch (action.type){
// TOTAL USERS PER LANGUAGES
        case "GET_TOTAL_USERS_PER_LANGUAGES_PENDING":{
            state = {...state, fetching:true};
            break;
        }    

        case "GET_TOTAL_USERS_PER_LANGUAGES_FULFILLED":{
            state =  { ...state, fetching:false, totalUsersPerLanguages : action.payload };
            break;
        }   
        
        case "GET_TOTAL_USERS_PER_LANGUAGES_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
// TOTAL USERS PER YEAR
        case "GET_TOTAL_USERS_PER_YEAR_PENDING":{
            state = {...state, fetching:true};
            break;
        }    

        case "GET_TOTAL_USERS_PER_YEAR_FULFILLED":{
            state =  { ...state, fetching:false, totalUsersPerYear : action.payload };
            break;
        }   
        
        case "GET_TOTAL_USERS_PER_YEAR_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }

        default:
        return state;       
        }
        return state;
    };