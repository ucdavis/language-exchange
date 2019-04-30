import axios from 'axios';
import superagent from 'superagent';

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

export function fetchCasUser(){
    return function(dispatch){
        dispatch({type:"FETCH_CAS_USER_PENDING"});
        axios.get('/api/partners/cas_user')
        .then(response => dispatch({type:"FETCH_CAS_USER_FULFILLED", payload:response.data}))
        .catch(err => dispatch({type:"FETCH_CAS_USER_REJECTED", payload: err}));
    }
}   

export function fetchCurrentUser(){
    return function(dispatch){
        dispatch({type:"FETCH_CURRENT_USER_PENDING"});
            axios.get("/api/partners/authenticated")
            .then(response => dispatch({type:"FETCH_CURRENT_USER_FULFILLED", payload:response.data}))
            .catch(err => dispatch({type:"FETCH_CURRENT_USER_REJECTED", payload: err}));
    }
}   

export function fetchUser(id){
    return function(dispatch){
        dispatch({type:"FETCH_USER_PENDING"})
        axios.get(`/api/partners/find/${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_REJECTED", payload: err})
        });
    }
}   

// UPDATE
// Update user 
export function updateUser(newUserData){
    return function (dispatch){
        dispatch({type:"UPDATE_USER_PENDING"});
        axios.request({
            method: 'patch',
            url : `/api/partners/${newUserData.id}`,
            data: {
                user_name : newUserData.user_name,
                email : newUserData.email,
                available : newUserData.available,
                description : newUserData.description,
                gender : newUserData.gender,
                email_confirmed : newUserData.email_confirmed,
                notify_by_email : newUserData.notify_by_email,
                affiliation : newUserData.affiliation,
                field_of_study : newUserData.field_of_study            }
        })
        .then(response =>dispatch({type:"UPDATE_USER_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_REJECTED", payload: err}));
    }
}

// Update user after login
export function updateUserLogin(){
    return function (dispatch){
        dispatch({type:"UPDATE_USER_LOGIN_PENDING"});
        axios.request({
            method: 'patch',
            url : "/api/partners/savelogin"
        })
        .then(response =>dispatch({type:"UPDATE_USER_LOGIN_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_LOGIN_REJECTED", payload: err}));
    }
}
// USER AVATAR

export function submitUserAvatar(image, id){
    return function(dispatch){
        var file = image[0];
        superagent.post("/api/storages/upload-avatar")
        .set("enctype", "multipart/form-data")
        .attach("image", file, file.name)
        .on('progress', function(e) {
            dispatch({type:"SAVE_USER_AVATAR_PENDING"})
          })
          .end((err, res) => {
              if(err){
                dispatch({type:"SAVE_USER_AVATAR_REJECTED", payload:"There was a problem"});
                console.log(err)
              }else{
                dispatch({type:"SAVE_USER_AVATAR_FULFILLED", payload:file})
              }
          })
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

// SEARCH TOOL
export function searchUsers(gender, provided, desired){
    return function(dispatch){
        dispatch({type:"SEARCH_USERS_PENDING"});
        axios.get(`/api/partners/searchPartner/${provided}/${desired}/${gender}`)
        .then(response => dispatch({type:"SEARCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"SEARCH_USERS_REJECTED", payload: err}));
    }
} 

// Fetch users for reports
export function fetchUsers(){
    return function(dispatch){
        dispatch({type:"FETCH_USERS_PENDING"})
        var filter = `{"include":[{"relation":"provided_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}}]}}},{"relation":"desired_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}}]}}}],"order":"created_at%20ASC"}`
        axios.get(`/api/partners?filter=${filter}`)
        .then(response => dispatch({type:"FETCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_USERS_REJECTED", payload: err}));
    }
}

export function userLogout(){
    return function(dispatch){
        dispatch({type:"USER_LOGOUT"})
    }
}
