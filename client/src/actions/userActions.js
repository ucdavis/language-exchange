import axios from 'axios';

export function createUser (newUser){
    return function(dispatch){
        axios.request({
            method: 'post',
            url : '/api/partners/',
            data: newUser
        })
        .then(response=>{
            dispatch({type:"CREATE_USER_FULFILLED",payload:response.data})
            })
        .catch(err=>dispatch({type: "CREATE_USER_REJECTED", payload: err}))
    }
}

export function fetchUsers(){
    return function(dispatch){
        axios.get('/api/partners')
        .then(response => dispatch({type:"FETCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_USERS_REJECTED", payload: err}));
    }
}

export function fetchCurrentUser(){
    return function(dispatch){
        axios.get('/api/partners/current/guest')
        .then(response => dispatch({type:"FETCH_CURRENT_USER_FULFILLED", payload:response.data}))
        .catch(err => dispatch({type:"FETCH_CURRENT_USER_REJECTED", payload: err}));
    }
}   

export function fetchCasUser(){
    return function(dispatch){
        axios.get('/api/partners/cas_user')
        .then(response => dispatch({type:"FETCH_CAS_USER_FULFILLED", payload:response.data}))
        .catch(err => dispatch({type:"FETCH_CAS_USER_REJECTED", payload: err}));
    }
}   

export function fetchUser(id){
    return function(dispatch){
        axios.get(`/api/partners/${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_REJECTED", payload: err})
        });
    }
}   

export function updateUser(newUser){
    return function (dispatch){
        axios.request({
            method: 'put',
            url : `/api/partners/${newUser.id}`,
            data: {
                cas_user : newUser.cas_user,
                user_name : newUser.user_name,
                email : newUser.email,
                available : newUser.available,
                description : newUser.description,
                gender : newUser.gender,
                email_confirmed : newUser.email_confirmed,
                notify_by_email : newUser.notify_by_email,
                affiliation : newUser.affiliation,
                field_of_study : newUser.field_of_study,
                updated_at : newUser.updated_at,
                created_at : newUser.created_at

            }
        })
        .then(response =>dispatch({type:"UPDATE_USER_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_REJECTED", payload: err}));
    }
}

export function searchUsers(gender, provided, desired){
    return function(dispatch){
        var filter = "";
        if( gender !== "Any"){
            filter = `{"where":{"and":[{"gender":{"like":"${gender}"}},{"available":true}]},"include":[{"relation":"provided_languages","scope":{"include":"languages","where":{"and":[{"ability":{"gt":0}},{"language_id":${provided}}]}}},{"relation":"desired_languages","scope":{"include":"languages","where":{"and":[{"ability":{"gt":0}},{"language_id":${desired}}]}}}]}`          
        }else{
            filter = `{"where":{"available":true},"include":[{"relation":"provided_languages","scope":{"include":"languages","where":{"and":[{"ability":{"gt":0}},{"language_id":${provided}}]}}},{"relation":"desired_languages","scope":{"include":"languages","where":{"and":[{"ability":{"gt":0}},{"language_id":${desired}}]}}}]}`
        }
        axios.get(`/api/partners?filter=${filter}`)
        .then(response => dispatch({type:"SEARCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"SEARCH_USERS_REJECTED", payload: err}));
    }
}  