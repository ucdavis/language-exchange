import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";


class LanguageDetail extends Component{
    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.fetchLanguage(id);
    }
    
    render(){ 
        let createdAt = (new Date(this.props.languageState.active.created_at)).toString();
        let updatedAt = (new Date(this.props.languageState.active.updated_at)).toString();

        if (!this.props.languageState.active) {
            return (<h4>Select a language </h4>);
        }       
        return (         
            <div>
               <h1>{this.props.languageState.active.name} </h1>
               <p><label>Date Created:</label> {createdAt} </p>
               <p><label>Date Updated:</label> {updatedAt} </p>
            </div>    
        )
    }
}

function mapStateToProps(state){
    return{ languageState: state.languageState }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchLanguage: languageActions.fetchLanguage}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguageDetail);