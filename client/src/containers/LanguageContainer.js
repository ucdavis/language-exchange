import React, { Component } from 'react';
import Language from '../components/languages/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../actions/languageActions";

class LanguageContainer extends Component{
    
    render(){        
        return (
            <div>
                <Language  state= {this.props.languages} fetchLanguages={this.props.fetchLanguages}  />
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
    return bindActionCreators({fetchLanguages: languageActions.fetchLanguages}, dispatch)
    
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);