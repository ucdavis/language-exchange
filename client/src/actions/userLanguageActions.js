import axios from 'axios';

export function fetchUserProvidedLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/provided_languages?filter[include]=languages&filter[include]=abilities&filter[where][and][0][ability][gt]=0&filter[where][and][1][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_PROVIDED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_PROVIDED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

export function fetchUserDesiredLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/desired_languages?filter[include]=languages&filter[include]=abilities&filter[where][and][0][ability][gt]=0&filter[where][and][1][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_DESIRED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_DESIRED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

export function fetchProvidedLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/provided_languages?filter[include]=languages&filter[include]=abilities&filter[where][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_PROVIDED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_PROVIDED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

export function fetchDesiredLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/desired_languages?filter[include]=languages&filter[include]=abilities&filter[where][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_DESIRED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_DESIRED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   