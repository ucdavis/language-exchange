import React, { Component } from 'react';

class ProvidedLanguagesDetail extends Component{
    render(){
        const languageItems = this.props.state.userProvidedLanguages.map((language, i) => {
            return <li key={i} language={language} state={this.props.state}>{language.languages.name} - {language.abilities.name}</li>
        })
        return (
            <div>
                <h4>Languages I know</h4>
                <ul className="list-group">
                    { languageItems }
                </ul>
                
            </div>    
        )
    }
}

export default ProvidedLanguagesDetail;