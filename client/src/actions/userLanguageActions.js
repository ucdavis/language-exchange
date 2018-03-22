import axios from 'axios';

export function createDesiredLanguage(newDesiredLanguage){
    return function(dispatch){
        dispatch({type:"CREATE_DESIRED_LANGUAGE_PENDING"});
        axios.request({
            method: 'post',
            url : '/api/desired_languages',
            data: newDesiredLanguage
        })
        .then(response=>{
            dispatch({type:"CREATE_DESIRED_LANGUAGE_FULFILLED",payload:response.data})
            })
        .then(response=>{
            dispatch(fetchUserDesiredLanguages(731))
            })
        .catch(err=>dispatch({type: "CREATE_DESIRED_LANGUAGE_REJECTED", payload: err}))
    }
}   

export function fetchUserProvidedLanguages(id){
    return function(dispatch){
        dispatch({type:"FETCH_USER_PROVIDED_LANGUAGES_PENDING"})
        axios.get(`/api/provided_languages?filter[include]=language&filter[include]=abilities&filter[where][and][0][ability][gt]=0&filter[where][and][1][user_id]=${id}`)
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
        dispatch({type:"FETCH_USER_DESIRED_LANGUAGES_PENDING"})
        axios.get(`/api/desired_languages?filter[include]=language&filter[include]=abilities&filter[where][and][0][ability][gt]=0&filter[where][and][1][user_id]=${id}`)
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
        axios.get(`/api/provided_languages?filter[include]=language&filter[include]=abilities&filter[where][user_id]=${id}`)
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
        axios.get(`/api/desired_languages?filter[include]=language&filter[include]=abilities&filter[where][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_DESIRED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_DESIRED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   



export function updateProvidedLanguages(providedLanguageUpdate){
    return function(dispatch){
        console.log("data from action",providedLanguageUpdate)
        let user_id = providedLanguageUpdate.user_id;
        let language_id = providedLanguageUpdate.language_id;
        let ability = providedLanguageUpdate.ability
        axios.request({
            method: 'put',
            url : `/api/provided_languages/upsertWithWhere?where={"user_id":${user_id},"language_id":${language_id}}`,
            data: {
                ability : ability
            }
        })
        .then(response => {
            dispatch({type:"UPDATE_PROVIDED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"UPDATE_PROVIDED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

export function updateDesiredLanguages(desiredLanguageUpdate){
    return function(dispatch){
        console.log("data from action",desiredLanguageUpdate)
        var id = desiredLanguageUpdate.id;
        var ability = desiredLanguageUpdate.ability;
        var updated_at = desiredLanguageUpdate.updated_at;
        axios.request({
            method: 'patch',
            url : `http://localhost:3000/api/desired_languages/${id}`,
            data: {
                ability : ability,
                updated_at : updated_at
            }
        })
        .then(response => {
            dispatch({type:"UPDATE_DESIRED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"UPDATE_DESIRED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   