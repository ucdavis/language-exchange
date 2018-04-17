import axios from 'axios';

// CHARTS FUNCTIONS
export function getTotalLanguages(){
    return function(dispatch){
        dispatch({type:"GET_TOTAL_LANGUAGES_PENDING"})   
        axios.get(`/api/total_languages?filter={"order":"total DESC"}`)
        .then(response => dispatch({type:"GET_TOTAL_LANGUAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"GET_TOTAL_LANGUAGES_REJECTED", payload: err}));
    }
} 