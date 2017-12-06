import axios from 'axios';

export default function fetchLanguages(){
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