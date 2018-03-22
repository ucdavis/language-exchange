import React, { Component } from 'react';
import * as userActions from "../../actions/userActions";
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import * as userLanguageActions from '../../actions/userLanguageActions';
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
        const user_id =  this.props.userState.current.id;
        const now = new Date();
        const newDesiredLanguage ={
            language_id : values.language_id,
            user_id : user_id,
            ability : values.ability,
            created_at : now,
            updated_at : now
        }
        this.props.createDesiredLanguage(newDesiredLanguage);

        console.log("newDesiredLanguage:",newDesiredLanguage);

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
      fetchAbilities : abilityActions.fetchAbilities,
      createDesiredLanguage : userLanguageActions.createDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LanguageSelection));