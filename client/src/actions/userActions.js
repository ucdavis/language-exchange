import axios from 'axios';

export function createUser (newUser){
    return function(dispatch){
        axios.request({
            method: 'post',
            url : 'http://localhost:3000/api/partners/',
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
        axios.get('http://localhost:3000/api/partners')
        .then(response => dispatch({type:"FETCH_USERS_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_USERS_REJECTED", payload: err}));
    }
}   

export function fetchUser(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/partners/${id}`)
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
            url : `http://localhost:3000/api/partners/${newUser.id}`,
            data: {
                cas_user : newUser.cas_user,
                user_name : newUser.user_name,
                email : newUser.email,
                available : newUser.available

            }
        })
        .then(response =>dispatch({type:"UPDATE_USER_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"UPDATE_USER_REJECTED", payload: err}));
    }
}


// export function deleteLanguage (languageId){
//     return function(dispatch){
//         axios.delete(`http://localhost:3000/api/languages/${languageId}`)
//         .then(response => dispatch({type:"DELETE_LANGUAGES_FULFILLED",payload:response.data}))
//         .catch(err=>dispatch({type: "DELETE_LANGUAGE_REJECTED", payload: err}))
//     }
// }
