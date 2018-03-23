import React, { Component } from 'react';
// import * as userActions from "../../actions/userActions";
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import * as userLanguageActions from '../../actions/userLanguageActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import LanguageSelectionForm from './LanguageSelectionForm';

class LanguageSelection extends Component{

    componentDidMount() {
        // this.props.fetchCurrentUser();
        this.props.fetchAbilities();
        this.props.fetchLanguages();
    // if (this.props.userState.current !== null){
    //       const id = this.props.userState.current.id;
    //     //   this.props.fetchUserProvidedLanguages(id);
    //       this.props.fetchUserDesiredLanguages(id);
        // }

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
    //   fetchCurrentUser : userActions.fetchCurrentUser,
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities,
    //   fetchUserDesiredLanguages : userLanguageActions.fetchUserDesiredLanguages,
      createDesiredLanguage : userLanguageActions.createDesiredLanguage
    //   fetchCurrentUser : userActions.fetchCurrentUser
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LanguageSelection));