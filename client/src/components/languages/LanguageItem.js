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
            <li className="list-group-item">
                <Link to={`/languages/${this.state.language.id}`}>  { this.state.language.name } </Link>  
                <Link to={{pathname:`/languages/edit/${this.state.language.id}`, search:"delete"}} className="btn btn-xs btn-default pull-right"> Delete </Link>  
                <Link to={`/languages/edit/${this.state.language.id}`} className="btn btn-xs btn-default pull-right"> Edit </Link>               
            </li> 
        );
    }
}

export default LanguageItem;