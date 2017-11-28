import React, { Component } from 'react';
import axios from 'axios';
import LanguageItem from './LanguageItem';

class Languages extends Component{
    constructor(){
        super();
        this.state={
            languages : []
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
                <ul className="list-group">
                    { languageItems }
                </ul>
            </div>    
        )
    }
}

export default Languages;