import React, { Component } from 'react';
import axios from 'axios';
import LanguageItem from '../components/LanguageItem'

class Languages extends Component{
    constructor(){
        super();
        this.state={
            languages : [],
            action : ''
        }
    }

    componentWillMount(){
        this.getLanguages();
    }

    getLanguages(){
        axios.get('http://localhost:3000/api/languages')
        .then(response => {
            this.setState({languages: response.data}, () => {
                // console.log(this.state.languages);
            });
        });
    }

    render(){
        const languageItems = this.state.languages.map((language, i) => {
            return <LanguageItem key={i} language={language} />
        })
        return (
            <div>
                <h1>Languages</h1>
                <ul className="list-group">
                    { languageItems }
                </ul>
                
            </div>    
        )
    }
}

export default Languages;