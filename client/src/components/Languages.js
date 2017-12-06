import React, { Component } from 'react';
import LanguageItem from './LanguageItem';

class Languages extends Component{
    constructor(props){
        super(props);
        this.state={
            languages : [{}],
            action : ''
        }
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