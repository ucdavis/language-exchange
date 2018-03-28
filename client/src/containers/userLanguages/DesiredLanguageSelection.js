import React, { Component } from 'react';
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import * as userLanguageActions from '../../actions/userLanguageActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import DesiredLanguageSelectionForm from '../../components/userLanguage/DesiredLanguageSelectionForm';

class DesiredLanguageSelection extends Component{

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
      }

    render(){
        const languages = this.props.languageState.languages;
        const languageAbility = this.props.abilityState.abilities
        const desiredLanguagesToRemove = this.props.desiredLanguages;

        for( var i=languages.length - 1; i>=0; i--){
            for( var j=0; j<desiredLanguagesToRemove.length; j++){
                if(languages[i] && (languages[i].id === desiredLanguagesToRemove[j].language.id)){
                    languages.splice(i, 1);
                }
            }
        }

        return (
            <div>
            <div> 
                <h2>Languages I'm learning</h2>
            </div>
                <DesiredLanguageSelectionForm
                    languages={languages}
                    abilities={languageAbility}
                    onSubmit={this.submit}
                    form="DesiredLanguageSelectionForm"
                    formKey="DesiredLanguageSelectionForm"
                    />
            <hr /> 
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
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities,
      createDesiredLanguage : userLanguageActions.createDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DesiredLanguageSelection));