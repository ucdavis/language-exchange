const initialState = {
    fetching : false,
    fetchingUser : false,
    fetched : false,
    users : [],
    cas_user : null,
    existed : null,
    current : {},
    created : {},
    active : {},
    searchResult : [],
    error : null,
    image_exists : [],
    directory_exists : false
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
        case "CREATE_USER_PENDING":{
            state = {...state, fetching:true};
            break;
        }     
        case "CREATE_USER_REJECTED":{
            state =  {...state, fetching:false, error: action.payload, created : null };
            break;
        }
        case "CREATE_USER_FULFILLED":{
            state =  { ...state, fetching:false, created : action.payload, current: action.payload};
            break;
        }
    // FETCH SINGLE USER
        case "FETCH_USER_PENDING":{
            state = {...state, fetching:true};
            break;
        }  
        case "FETCH_USER_FULFILLED":{
            state = {...state, fetching:false, active : action.payload }
            break;
        }
        case "FETCH_USER_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
    // FETCH SINGLE USER
        case "CHECK_USER_DIRECTORY_PENDING":{
            state = {...state, fetching:true};
            break;
        }  
        case "CHECK_USER_DIRECTORY_FULFILLED":{
            state = {...state, fetching:false,  directory_exists : action.payload }
            break;
        }
        case "CHECK_USER_DIRECTORY_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
     // FETCH CURRENT USER
     case "FETCH_CURRENT_USER_PENDING":{
        state = {...state, fetching:true, fetchingUser:true}
        break;
    }

     case "FETCH_CURRENT_USER_FULFILLED":{
        state = {...state, fetching:false,fetchingUser:false, current:action.payload }
        break;
    }
    case "FETCH_CURRENT_USER_REJECTED":{
        state =  {...state, fetching: false, fetchingUser:false, error: action.payload };
        break;
    }    
     // FETCH CAS USER
     case "FETCH_CAS_USER_PENDING":{
        state = {...state, fetching:true, fetchingUser:true }
        break;
    }
     case "FETCH_CAS_USER_FULFILLED":{
        state = {...state, fetching:false, cas_user:action.payload }
        break;
    }
    case "FETCH_CAS_USER_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }    
     // CHECK EXISTED USER
     case "EXISTED_USER_PENDING":{
        state = {...state, fetching:true }
        break;
    }
     case "EXISTED_USER_FULFILLED":{
        state = {...state, fetching:false, existed:action.payload }
        break;
    }
    case "EXISTED_USER_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }    
    // UPDATE USER
    case "UPDATE_USER_PENDING":{
        state = {...state, fetching:true }
        break;
    }
    case "UPDATE_USER_FULFILLED":{
        state =  { ...state, fetching:false, current: action.payload };
        break;
    }
    case "UPDATE_USER_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
    // UPDATE USER LOGIN
    case "UPDATE_USER_LOGIN_PENDING":{
        state = {...state, fetching:true }
        break;
    }
    case "UPDATE_USER_LOGIN_FULFILLED":{
        state =  { ...state, fetching:false};
        break;
    }
    case "UPDATE_USER_LOGIN_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// UPLOAD AVATAR
    case "UPDATE_USER_AVATAR_PENDING":{
        state =  { ...state, fetching:true };
        break;
    }
    case "UPDATE_USER_AVATAR_FULFILLED":{
        state =  { ...state, fetching:false };
        break;
    }
    case "UPDATE_USER_AVATAR_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// DELETE AVATAR
    case "DELETE_USER_AVATAR_PENDING":{
        state =  { ...state, fetching:true };
        break;
    }
    case "DELETE_USER_AVATAR_FULFILLED":{
        state =  { ...state, fetching:false };
        break;
    }
    case "DELETE_USER_AVATAR_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// CHECK_IMAGE_EXISTS
    case "CHECK_IMAGE_EXISTS_PENDING":{
        state =  { ...state, fetching:true, image_exists : null };
        break;
    }
    case "CHECK_IMAGE_EXISTS_FULFILLED":{
        state =  { ...state, fetching:false, image_exists : action.payload};
        break;
    } 
    case "CHECK_IMAGE_EXISTS_REJECTED":{
        state =  {...state, fetching: false, error: action.payload, image_exists : null };
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
        state =  { ...state, fetching:false, searchResult : action.payload };
        break;
    }
// CREATE_USER_DIRECTORY
    case "CREATE_USER_DIRECTORY_PENDING":{
        state = {...state, fetching:true};
        break;
    }  
    case "CREATE_USER_DIRECTORY_FULFILLED":{
        state =  { ...state, fetching:false};
        break;
    }  
    case "CREATE_USER_DIRECTORY_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// CREATE_USER_DIRECTORY_AND_SAVE
    case "CREATE_USER_DIRECTORY_AND_SAVE_PENDING":{
        state = {...state, fetching:true};
        break;
    }  
    case "CREATE_USER_DIRECTORY_AND_SAVE_FULFILLED":{
        state =  { ...state, fetching:false};
        break;
    }  
    case "CREATE_USER_DIRECTORY_AND_SAVE_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// SAVE_USER_AVATAR
    case "SAVE_USER_AVATAR_PENDING":{
        state = {...state, fetching:true};
        break;
    }  
    case "SAVE_USER_AVATAR_FULFILLED":{
        state =  { ...state, fetching:false};
        break;
    }  
    case "SAVE_USER_AVATAR_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
// CREATE_USER_FOLDER
    case "CREATE_USER_FOLDER_PENDING":{
        state = {...state, fetching:true};
        break;
    }  
    case "CREATE_USER_FOLDER_FULFILLED":{
        state =  { ...state, fetching:false};
        break;
    }  
    case "CREATE_USER_FOLDER_REJECTED":{
        state =  {...state, fetching: false, error: action.payload };
        break;
    }
    


    default:
    return state;       
    }
    return state;
};