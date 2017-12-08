import axios from 'axios';

export const fetchLanguages = ()=>{
        axios.get('http://localhost:3000/api/languages')
        .then(response => {
            this.setState({languages: response.data}, () => {
                console.log(this.state);
            })
        })
        .catch(err => console.log("There was an error fetching Language", err));
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