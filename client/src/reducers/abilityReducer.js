const initialState = {
    fetching: false,
    abilities: [],
    active :{},
    error: null
  }

export default function languageReducer(state=initialState, action) {

     switch (action.type){

        case "FETCH_ABILITIES_PENDING":{
            state = {...state, fetching:true};
            break;
        }       
        
        case "FETCH_ABILITIES_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
        
        case "FETCH_ABILITIES_FULFILLED":{
            state =  { ...state, fetching:false, abilities : action.payload };
            break;
        }


        default:
        return state;       
        }
        return state;
    };