import React, { Component } from 'react';
import  LanguageItem from './LanguageItem';

class Languages extends Component{
    render(){
        const languageItems = this.props.state.languages.map((language, i) => {
            return <LanguageItem key={i} language={language} state={this.props.state} fetchLanguage={()=>this.props.fetchLanguage} />
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