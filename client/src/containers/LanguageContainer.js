import React, { Component } from 'react';
import Language from '../components/languages/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../actions/languageActions";
import { editLanguage } from '../actions/languageActions';

class LanguageContainer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Language  languages= {this.props.languages} />
            </div>    
        )
    }
}

function mapStateToProps(state){
    return{
        languages: state.languages
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({editLanguage: languageActions.editLanguage}, dispatch)
    
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);