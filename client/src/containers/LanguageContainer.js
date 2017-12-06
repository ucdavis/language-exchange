import React, { Component } from 'react';
import Language from '../components/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import languageActions from "../actions/languageActions";

class LanguageContainer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Language  getLanguages= {this.props.actions.getLanguages}/>
            </div>    
        )
    }
}

function mapStateToProps(state){
    return{
        languageList: state.languageReducer
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(languageActions,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);