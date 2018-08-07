import axios from 'axios';

export function createMessage (newMessage){
    return function(dispatch){
        axios.request({
            method: 'post',
            url : '/api/contacts/',
            data: newMessage
        })
        .then(response=> dispatch({type:"CREATE_MESSAGE_FULFILLED",payload:response.data}))
        .catch(err=>dispatch({type: "CREATE_MESSAGE_REJECTED", payload: err}))
    }
}

export function fetchSentMessages(id){
    return function(dispatch){
        axios.get("/api/contacts/sent")
        .then(response => dispatch({type:"FETCH_SENT_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_SENT_MESSAGES_REJECTED", payload: err}));
    }
}   

export function fetchReceivedMessages(id){
    return function(dispatch){
        axios.get('/api/contacts/received')
        .then(response => dispatch({type:"FETCH_RECEIVED_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_RECEIVED_MESSAGES_REJECTED", payload: err}));
    }
}  
