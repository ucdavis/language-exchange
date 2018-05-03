import React, { Component } from 'react';

class DesiredLanguagesDetail extends Component{
    render(){
        const languageItems = this.props.state.userDesiredLanguages.map((language, i) => {
            return <li className="list-group-item"  key={i} language={language} state={this.props.state}>{language.language.name} - {language.abilities.name}</li>
        })
        return (
            <div>
                <h5>Languages I'm learning</h5>
                <ul className="list-group">
                    { languageItems }
                </ul>
                
            </div>    
        )
    }
}

export default DesiredLanguagesDetail;