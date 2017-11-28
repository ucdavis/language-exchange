import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LanguageItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            language : props.language
        }
    }

    render(){
        return(
            <li className="list-group-item"> <Link to={`/languages/${this.state.language.id}`}>{ this.state.language.name } </Link></li> 
        );
    }
}

export default LanguageItem;