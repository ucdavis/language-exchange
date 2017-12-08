import React, { Component } from 'react';
import { connect } from "react-redux";


class LanguageDetail extends Component{
    
    render(){ 
        if (!this.props.activeLanguage) {
            return (<h4>Select a language </h4>);
        }       
        return (
           
            <div>
               <h1>{this.props.activeLanguage.name} </h1>
               <h4>Date Created: {this.props.activeLanguage.created_at} </h4>
            </div>    
        )
    }
}

function mapStateToProps(state){
    return{
        activeLanguage: state.activeLanguage
    }
}

export default connect(mapStateToProps)(LanguageDetail);