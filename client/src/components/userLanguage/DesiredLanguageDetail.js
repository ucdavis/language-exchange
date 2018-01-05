import React, { Component } from 'react';

class DesiredLanguagesDetail extends Component{
    render(){
        const languageItems = this.props.state.desiredLanguages.map((language, i) => {
            return <li key={i} language={language} state={this.props.state}>{language.languages.name} - {language.abilities.name}</li>
        })
        return (
            <div>
                <h4>Languages I'm learning</h4>
                <ul className="list-group">
                    { languageItems }
                </ul>
                
            </div>    
        )
    }
}

export default DesiredLanguagesDetail;