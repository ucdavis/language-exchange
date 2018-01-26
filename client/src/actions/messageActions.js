import axios from 'axios';

export function createMessage (newMessage){
    return function(dispatch){
        axios.request({
            method: 'post',
            url : 'http://localhost:3000/api/contacts/',
            data: newMessage
        })
        .then(response=> dispatch({type:"CREATE_MESSAGE_FULFILLED",payload:response.data}))
        .catch(err=>dispatch({type: "CREATE_MESSAGE_REJECTED", payload: err}))
    }
}

export function fetchSentMessages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/contacts?filter={"include":{"relation":"recipient"},"where":{"sender_id":${id}}}`)
        .then(response => dispatch({type:"FETCH_SENT_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_SENT_MESSAGES_REJECTED", payload: err}));
    }
}   

export function fetchReceivedMessages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/contacts?filter={"include":{"relation":"sender"},"where":{"recipient_id":${id}}}`)
        .then(response => dispatch({type:"FETCH_RECEIVED_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_RECEIVED__MESSAGES_REJECTED", payload: err}));
    }
}  

export function fetchMessage(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/contacts/${id}`)
        .then(response => dispatch({type:"FETCH_MESSAGE_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH__MESSAGE_REJECTED", payload: err}));
    }
}   

