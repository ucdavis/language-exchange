import axios from 'axios';

// export function createUser (newUser){
//     return function(dispatch){
//         axios.request({
//             method: 'post',
//             url : 'http://localhost:3000/api/partners/',
//             data: newUser
//         })
//         .then(response=>{
//             dispatch({type:"CREATE_USER_FULFILLED",payload:response.data})
//             })
//         .catch(err=>dispatch({type: "CREATE_USER_REJECTED", payload: err}))
//     }
// }

// export function fetchUsers(){
//     return function(dispatch){
//         axios.get('http://localhost:3000/api/partners')
//         .then(response => dispatch({type:"FETCH_USERS_FULFILLED",payload:response.data}))
//         .catch(err => dispatch({type:"FETCH_USERS_REJECTED", payload: err}));
//     }
// }   

export function fetchProvidedLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/provided_languages?filter[include]=languages&filter[include]=abilities&filter[where][and][1][ability][gt]=0&filter[where][and][0][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_PROVIDED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_PROVIDED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

export function fetchDesiredLanguages(id){
    return function(dispatch){
        axios.get(`http://localhost:3000/api/desired_languages?filter[include]=languages&filter[include]=abilities&filter[where][and][1][ability][gt]=0&filter[where][and][0][user_id]=${id}`)
        .then(response => {
            dispatch({type:"FETCH_USER_DESIRED_LANGUAGES_FULFILLED",payload:response.data})
            })
        .catch(err => {
            dispatch({type:"FETCH_USER_DESIRED_LANGUAGES_REJECTED", payload: err})
        });
    }
}   

// export function updateUser(newUser){
//     return function (dispatch){
//         axios.request({
//             method: 'put',
//             url : `http://localhost:3000/api/partners/${newUser.id}`,
//             data: {
//                 cas_user : newUser.cas_user,
//                 user_name : newUser.user_name,
//                 email : newUser.email,
//                 available : newUser.available,
//                 description : newUser.description,
//                 gender : newUser.gender,
//                 email_confirmed : newUser.email_confirmed,
//                 notify_by_email : newUser.notify_by_email,
//                 affiliation : newUser.affiliation,
//                 field_of_study : newUser.field_of_study,
//                 updated_at : newUser.updated_at,
//                 created_at : newUser.created_at

//             }
//         })
//         .then(response =>dispatch({type:"UPDATE_USER_FULFILLED",payload:response.data}))
//         .catch(err => dispatch({type:"UPDATE_USER_REJECTED", payload: err}));
//     }
// }