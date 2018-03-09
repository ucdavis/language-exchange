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
        axios.get(`/api/contacts?filter={"include":{"relation":"recipient"},"where":{"sender_id":${id}},"order":"created_at%20DESC"}`)
        .then(response => dispatch({type:"FETCH_SENT_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_SENT_MESSAGES_REJECTED", payload: err}));
    }
}   

export function fetchReceivedMessages(id){
    return function(dispatch){
        axios.get(`/api/contacts?filter={"include":{"relation":"sender"},"where":{"recipient_id":${id}},"order":"created_at%20DESC"}`)
        .then(response => dispatch({type:"FETCH_RECEIVED_MESSAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_RECEIVED_MESSAGES_REJECTED", payload: err}));
    }
}  

export function fetchMessage(id){
    return function(dispatch){
        axios.get(`/api/contacts?filter={"include":{"relation":"sender"},"where":{"id":${id}}}`)
        .then(response => dispatch({type:"FETCH_MESSAGE_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_MESSAGE_REJECTED", payload: err}));
    }
} 

export function updateMessage(messageData){
    return function(dispatch){
        axios.request({
            method: 'put',
            url : `/api/contacts/${messageData.id}`,
            data: {
                content : messageData.content,
                sender_id : messageData.sender_id,
                recipient_id : messageData.recipient_id,
                subject : messageData.subject,
                read : messageData.read,
                updated_at : messageData.updated_at,
                created_at : messageData.created_at

            }
        })
        .then(response => dispatch({type:"UPDATE_MESSAGE_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_MESSAGE_REJECTED", payload: err}));
    }
}   

