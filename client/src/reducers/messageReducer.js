const initialState = {
    fetching: false,
    fetched: false,
    sent_messages: [],
    received_messages: [],
    message:{},
    error: null
  }

export default function userReducer(state=initialState, action) {

     switch (action.type){


    // CREATE MESSAGE
        case "CREATE_MESSAGE_REJECTED":{
            state =  {...state, error: action.payload };
            break;
        }
        case "CREATE_MESSAGE_FULFILLED":{
            state =  { ...state, message : action.payload };
            break;
        }
    // FETCH SENT MESSAGES
        case "FETCH_SENT_MESSAGES_FULFILLED":{
            state = {...state, message : [],  sent_messages : action.payload}
            break;
        }

        case "FETCH_SENT_MESSAGES_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
    // FETCH RECEIVED MESSAGES
        case "FETCH_RECEIVED_MESSAGES_FULFILLED":{
            state = {...state, message : [],  received_messages : action.payload}
            break;
        }

        case "FETCH_RECEIVED_MESSAGES_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }

        // FETCH SINGLE MESSAGE
        case "FETCH_MESSAGE_FULFILLED":{
            state = {...state, message : action.payload}
            break;
        }

        case "FETCH_MESSAGE_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }
        // UPDATE MESSAGE
        case "UPDATE_MESSAGE_FULFILLED":{
            state = {...state, message : action.payload}
            break;
        }

        case "UPDATE_MESSAGE_REJECTED":{
            state =  {...state, fetching: false, error: action.payload };
            break;
        }

        default:
        return state;       
        }
        return state;
    };