import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import { withRouter } from 'react-router-dom';
import ProvidedLanguagesForm from '../../components/userLanguage/ProvidedLanguagesForm';

class ProvidedLanguagesOptions extends React.Component {


  deleteProvidedLanguage = (providedLanguageId,user_id)=>{
    this.props.deleteProvidedLanguage(providedLanguageId,user_id);
  }

  render() {

    const providedLanguages = this.props.providedLanguages.map(language => {
      return(
        
        <li className="list-group-item" key = {language.id}>
        <ProvidedLanguagesForm
          form = {'ProvidedLanguagesForm_'+language.language.name}
          onSubmit={ this.submit }
          languageName = {language.language.name}
          initialValues = {{ability:language.ability}}
          providedLanguageId = {language.id}
          deleteProvidedLanguage = {this.deleteProvidedLanguage}
          user_id = {language.user_id}
          ability = {language.abilities.name}
          abilities = {this.props.abilities}
        />
        </li>
      )
    })

  if(providedLanguages.length){
      return (
          <div>
            <ul className="list-group list-group-flush">
            { providedLanguages }
            </ul>
        </div>
      )
    }else{
      return <label>Please add a language to your list</label>
    }
    }
  }
    

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      deleteProvidedLanguage : userLanguageActions.deleteProvidedLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ProvidedLanguagesOptions));