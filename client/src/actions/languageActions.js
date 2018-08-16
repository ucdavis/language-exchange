import axios from 'axios';

export function createLanguage (newLanguage){
    return function(dispatch){
        axios.request({
            method: 'post',
            url : '/api/languages/',
            data: newLanguage
        })
        .then(response=>{
            dispatch({type:"CREATE_LANGUAGE_FULFILLED",payload:response.data})
            })
        .catch(err=>dispatch({type: "CREATE_LANGUAGE_REJECTED", payload: err}))
    }
}

export function fetchLanguages(){
    return function(dispatch){
        dispatch({type:"FETCH_LANGUAGES_PENDING"})
        axios.get('/api/languages?filter={"order":"name%20ASC"}')
        .then(response => dispatch({type:"FETCH_LANGUAGES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_LANGUAGES_REJECTED", payload: err}));
    }
}   

export function fetchLanguage(id){
    return function(dispatch){
        axios.get(`/api/languages/${id}`)
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
        dispatch({type:"UPDATE_LANGUAGE_PENDING"})
        axios.request({
            method: 'patch',
            url : `/api/languages/${newLanguage.id}`,
            data: {
                name : newLanguage.name,
                short_name : newLanguage.short_name,
                updated_at : newLanguage.updated_at
                
            }
        })
        .then( response =>{
            dispatch({type:"FETCH_LANGUAGES_PENDING"})
            axios.get('/api/languages')
            .then(response => dispatch({type:"FETCH_LANGUAGES_FULFILLED",payload:response.data}))
            .catch(err => dispatch({type:"FETCH_LANGUAGES_REJECTED", payload: err}));
        }
            
        )
        .then(response =>dispatch({type:"UPDATE_LANGUAGE_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_LANGUAGE_REJECTED", payload: err}));
    }
}


export function deleteLanguage (languageId){
    return function(dispatch){
        axios.delete(`/api/languages/${languageId}`)
        .then(response => dispatch({type:"DELETE_LANGUAGES_FULFILLED",payload:response.data}))
        .catch(err=>dispatch({type: "DELETE_LANGUAGE_REJECTED", payload: err}))
    }
}
