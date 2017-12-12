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

export const editLanguage = (name)=>{

    console.log("New Name: ",name);
    return {
        type: "EDIT_LANGUAGE",
        payload : name
    }
}

export const showLanguage = (language)=>{
        return {
            type: "SHOW_LANGUAGE",
            payload : language
        }
    }