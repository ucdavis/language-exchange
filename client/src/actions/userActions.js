import axios from 'axios';

export function createUser (newUser){
    return function(dispatch){
        dispatch({type:"CREATE_USER_PENDING"});
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

export function existedUser(cas_user){
    return function(dispatch){
        axios.get(`/api/partners?filter={"where":{"cas_user":${cas_user}}`)
        .then(response => dispatch({type:"EXISTED_USER_FULFILLED", payload:response.data}))
        .catch(err => dispatch({type:"EXISTED_USER_REJECTED", payload: err}));
    }
}   

export function fetchCasUser(){
    return function(dispatch){
        axios.get('/api/partners/cas_user')
        .then(response => dispatch({type:"FETCH_CAS_USER_FULFILLED", payload:response.data}))
        .catch(err => dispatch({type:"FETCH_CAS_USER_REJECTED", payload: err}));
    }
}   

export function fetchCurrentUser(){
    return function(dispatch){
        let cas_user = null;
        axios.get('/api/partners/cas_user')
        .then(response => {
            cas_user = response.data;
            axios.get(`/api/partners/current/${cas_user}`)
            .then(response => dispatch({type:"FETCH_CURRENT_USER_FULFILLED", payload:response.data}))
            .catch(err => dispatch({type:"FETCH_CURRENT_USER_REJECTED", payload: err}));

        })
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

export function updateUser(newUserData){
    return function (dispatch){
        axios.request({
            method: 'put',
            url : `/api/partners/${newUserData.id}`,
            data: {
                cas_user : newUserData.cas_user,
                user_name : newUserData.user_name,
                email : newUserData.email,
                available : newUserData.available,
                description : newUserData.description,
                gender : newUserData.gender,
                email_confirmed : newUserData.email_confirmed,
                notify_by_email : newUserData.notify_by_email,
                affiliation : newUserData.affiliation,
                field_of_study : newUserData.field_of_study,
                updated_at : newUserData.updated_at,
                created_at : newUserData.created_at

            }
        })
        .then(response =>dispatch({type:"UPDATE_USER_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_REJECTED", payload: err}));
    }
}
export function updateUserAvatar(avatarUserData){    
    return function (dispatch){
        dispatch({type:"UPDATE_USER_AVATAR_PENDING"});
        axios.request({
            method: 'patch',
            url : `/api/partners/${avatarUserData.id}`,
            data: {
                avatar_file_name : avatarUserData.avatar_file_name,
                avatar_content_type : avatarUserData.avatar_content_type,
                avatar_file_size : avatarUserData.size,
                avatar_updated_at : avatarUserData.avatar_updated_at,
                updated_at : avatarUserData.updated_at

            }
        })
        .then(response =>dispatch({type:"UPDATE_USER_AVATAR_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_AVATAR_REJECTED", payload: err}));
    }
}

export function deleteUserAvatar(file_name){
    return function(dispatch){
        dispatch({type:"DELETE_USER_AVATAR_PENDING"});
        axios.delete(`/api/storages/images/files/${file_name}`)
        .then(response => dispatch({type:"DELETE_USER_AVATAR_FULFILLED",payload:response.data}))
        .catch(err=>dispatch({type: "DELETE_USER_AVATAR_REJECTED", payload: err}))
    }
}

export function searchUsers(gender, provided, desired){
    return function(dispatch){
        var filter = "";
        if( gender !== "Any"){
            filter = `{"where":{"and":[{"gender":{"like":"${gender}"}},{"available":true}]},"include":[{"relation":"provided_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${provided}}]}}},{"relation":"desired_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${desired}}]}}}]}`          
        }else{
            filter = `{"where":{"available":true},"include":[{"relation":"provided_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${provided}}]}}},{"relation":"desired_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${desired}}]}}}]}`
        }
        axios.get(`/api/partners?filter=${filter}`)
        .then(response => dispatch({type:"SEARCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"SEARCH_USERS_REJECTED", payload: err}));
    }
}  