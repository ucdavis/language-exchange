import axios from 'axios';

// CHARTS FUNCTIONS
export function getTotalUsersPerLanguages(){
    return function(dispatch){
        dispatch({type:"GET_TOTAL_USERS_PER_LANGUAGES_PENDING"})   
        axios.get('/api/total_languages?filter={"order":"total DESC"}')
        .then(response => dispatch({type:"GET_TOTAL_USERS_PER_LANGUAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"GET_TOTAL_USERS_PER_LANGUAGES_REJECTED", payload: err}));
    }
} 

export function getTotalUsersPerYear(){
    return function(dispatch){
        dispatch({type:"GET_TOTAL_USERS_PER_YEAR_PENDING"})   
        axios.get('/api/users_per_years')
        .then(response => dispatch({type:"GET_TOTAL_USERS_PER_YEAR_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"GET_TOTAL_USERS_PER_YEAR_REJECTED", payload: err}));
    }
} 