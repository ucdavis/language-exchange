import React, { Component } from 'react';
import * as userActions from "../../actions/userActions";
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import LanguageSelectionForm from './LanguageSelectionForm';

class LanguageSelection extends Component{

    componentDidMount() {
        this.props.fetchAbilities();
        this.props.fetchLanguages();
    }

    submit = values => {
        console.log("Values:",values);
      }

    render(){
        const languageItems = this.props.languageState.languages
        const languageAbility = this.props.abilityState.abilities
        return (
            <div>
                <LanguageSelectionForm
                    languages={languageItems}
                    abilities={languageAbility}
                    onSubmit={this.submit}
                    />

            </div>  
        )
    }
}

function mapStateToProps(state){
    return{ abilityState: state.abilityState,
            languageState : state.languageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchCurrentUser : userActions.fetchCurrentUser,
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LanguageSelection));