import axios from 'axios';

export function fetchLanguages(){
    return function(dispatch){
        axios.get('http://localhost:3000/api/languages')
        .then(response => dispatch({type:"FETCH_LANGUAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_LANGUAGES_REJECTED", payload: err}));
    }
}   

export function fetchLanguage(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/languages/${id}`)
        .then(response => {
            dispatch({type:"FETCH_LANGUAGE_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_LANGUAGE_REJECTED", payload: err})
        });
    }
}   

export function updateLanguage(newLanguage){
    return function (dispatch){
        axios.request({
            method: 'put',
            url : `http://localhost:3000/api/languages/${newLanguage.id}`,
            data: {
                name : newLanguage.name,
                updated_at : newLanguage.updated_at,
                created_at : newLanguage.created_at,
                
            }
        })
        .then(response => {
            dispatch({type:"UPDATE_LANGUAGE_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"UPDATE_LANGUAGE_REJECTED", payload: err})
        });
    }
}

export const showLanguage = (language)=>{
        return {
            type: "SHOW_LANGUAGE",
            payload : language
        }
    }