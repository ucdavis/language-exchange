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
        const now = new Date();
        const newDesiredLanguage ={
            language_id : values.language_id,
            ability : values.ability,
            created_at : now,
            updated_at : now
        }
        this.props.createDesiredLanguage(newDesiredLanguage);
      }

    render(){
        const languages = this.props.languageState.languages;
        const languageAbility = this.props.abilityState.abilities
        const desiredLanguagesToRemove = this.props.userLanguageState.userDesiredLanguages;

        for( var i=languages.length - 1; i>=0; i--){
            for( var j=0; j<desiredLanguagesToRemove.length; j++){
                if(languages[i] && (languages[i].id === desiredLanguagesToRemove[j].language.id)){
                    languages.splice(i, 1);
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
                        className="btn btn-outline-info nav-item nav-link"
                        onClick={ ()=>this.props.showProvided() } 
                    >
                        Languages I know
                    </button>

                    <button
                        type="button"
                        id = "desiredButton"
                        className="btn btn-info nav-item nav-link"
                    >
                        Languages I'm learning
                    </button>
                    </nav>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h3>Languages I'm learning</h3>
                            <p>Please make sure to complete both well known and learning languages above</p>
                            <DesiredLanguageSelectionForm
                                languages={languages}
                                abilities={languageAbility}
                                onSubmit={this.submit}
                                form="DesiredLanguageSelectionForm"
                                formKey="DesiredLanguageSelectionForm"
                            />
                        </div>    
                    </div>    
                </div>
            </div>
        </div> 
        )
        
    }
}

function mapStateToProps(state){
    return{ abilityState: state.abilityState,
            languageState : state.languageState,
            userState : state.userState,
            userLanguageState : state.userLanguageState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities,
      createDesiredLanguage : userLanguageActions.createDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DesiredLanguageSelection));