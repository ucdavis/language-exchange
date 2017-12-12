import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LanguageItem extends Component{

    render(){

        return(
            
            <li className="list-group-item">
                <Link to={`/languages/${this.props.language.id}`} >  { this.props.language.name } </Link>  
                <Link to={`/languages/edit/${this.props.language.id}`} className="btn btn-xs btn-default pull-right"> Delete </Link>  
                <Link to={`/languages/edit/${this.props.language.id}`} className="btn btn-xs btn-default pull-right"> Edit </Link>               
            </li> 
        );
    }
}

export default LanguageItem;