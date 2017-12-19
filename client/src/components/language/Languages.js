import React, { Component } from 'react';
import  LanguageItem from './LanguageItem';
import { Link } from 'react-router-dom';

class Languages extends Component{
    render(){
        const languageItems = this.props.state.languages.map((language, i) => {
            return <LanguageItem key={i} language={language} state={this.props.state} fetchLanguage={()=>this.props.fetchLanguage} />
        })
        return (
            <div>
                <h1>Languages<Link to={'/languages/add'} className="btn btn-sm btn-success pull-right" > New Language </Link>    </h1>
                <ul className="list-group">
                    { languageItems }
                </ul>
                
            </div>    
        )
    }
}

export default Languages;