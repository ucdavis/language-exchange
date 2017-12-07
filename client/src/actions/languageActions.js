import axios from 'axios';

export const fetchLanguages = ()=>{
    return (dispatch)=>{
        axios.get('http://localhost:3000/api/languages')
        .then((response)=>{
            dispatch({
                type: "FETCH_LANGUAGE_START",
                payload: response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: "FETCH_LANGUAGE_ERROR",
                payload: err
            })
        })
    }
}

export const editLanguage = (name)=>{

    console.log("New Name: ",name);
    return {
        type: "EDIT_LANGUAGE",
        payload : name
    }
}