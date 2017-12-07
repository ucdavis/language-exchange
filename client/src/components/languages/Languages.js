import React, { Component } from 'react';
import axios from 'axios';
import LanguageItem from './LanguageItem';

class Languages extends Component{
    constructor(){
        super();
        this.state={
            languages : [],
            action : ''
        }
    }


    render(){
        console.log(this.props.languages.languages)
        const languageItems = this.props.languages.languages.map((language, i) => {
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