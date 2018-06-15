import React, { Component } from 'react';
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import * as userLanguageActions from '../../actions/userLanguageActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProvidedLanguageSelectionForm from '../../components/userLanguage/ProvidedLanguageSelectionForm';

class ProvidedLanguageSelection extends Component{

    componentDidMount() {
        this.props.fetchAbilities();
        this.props.fetchLanguages();
    }

    submit = values => {
        const user_id =  this.props.userState.current.id;
        const now = new Date();
        const newProvidedLanguage ={
            language_id : values.provided_language_id,
            user_id : user_id,
            ability : values.ability,
            created_at : now,
            updated_at : now
        }
        this.props.createProvidedLanguage(newProvidedLanguage);
      }

    render(){
        const providedLanguagesSelect = this.props.languageState.languages;
        const languageAbility = this.props.abilityState.abilities
        const languagesToRemove =  this.props.userLanguageState.userProvidedLanguages;

 
        if(this.props.userLanguageState.fetching){
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Languages I know</h3>          
                        </div>
                    </div>
                </div>
            )
        }else{
            for( var i=providedLanguagesSelect.length - 1; i>=0; i--){
                for( var j=0; j<languagesToRemove.length; j++){
                    if(providedLanguagesSelect[i] && (providedLanguagesSelect[i].id === languagesToRemove[j].language.id)){
                        providedLanguagesSelect.splice(i, 1);
                    }
                }
            }
    
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12">

                            <nav className="nav nav-pills nav-fill mt-3">
                            <button
                                type="button"
                                id = "providedButton"
                                className="btn btn-info nav-item nav-link"
                            >
                                Languages I know
                            </button>

                            <button
                                type="button"
                                id = "desiredButton"
                                className="btn btn-outline-info nav-item nav-link"
                                onClick={ ()=>this.props.showDesired() } >
                                Languages I'm learning
                            </button>
                            </nav>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3>Languages I know</h3>
                                    <p>Please make sure to complete both well known and learning languages above</p>
                                    <ProvidedLanguageSelectionForm
                                        providedLanguagesSelect={providedLanguagesSelect}
                                        abilities={languageAbility}
                                        onSubmit={this.submit}
                                        form="ProvidedLanguageSelectionForm"
                                        formKey="ProvidedLanguageSelectionForm"
                                    />  
                                </div>    
                            </div>    
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

function mapStateToProps(state){
    return{ abilityState: state.abilityState,
            languageState : state.languageState,
            userLanguageState : state.userLanguageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities,
      createProvidedLanguage : userLanguageActions.createProvidedLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ProvidedLanguageSelection));