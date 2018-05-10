import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import { withRouter } from 'react-router-dom';
import ProvidedLanguagesForm from '../../components/userLanguage/ProvidedLanguagesForm';
import * as abilityActions from '../../actions/abilityActions';

class ProvidedLanguagesOptions extends React.Component {


  deleteProvidedLanguage = (providedLanguageId,user_id)=>{
    this.props.deleteProvidedLanguage(providedLanguageId,user_id);
  }

  render() {
      
    const providedLanguages = this.props.userLanguageState.userProvidedLanguages.map(language => {
      return(
        
        <div key = {language.id} className="col-sm-4">
        <ProvidedLanguagesForm
          form = {'ProvidedLanguagesForm_'+language.language.name}
          onSubmit={ this.submit }
          languageName = {language.language.name}
          initialValues = {{ability:language.ability}}
          providedLanguageId = {language.id}
          deleteProvidedLanguage = {this.deleteProvidedLanguage}
          user_id = {language.user_id}
          ability = {language.abilities}
          abilities = {this.props.abilityState.abilities}
        />
        </div>
      )
    });

if (this.props.userLanguageState.fetching ){
  return(<h5>..loading</h5>);
      }else{
        if(providedLanguages.length){
            return (
              <div>
                  <div className="row">
                    <div className="col-sm-12">                
                      <div className="card-group">
                        { providedLanguages }
                      </div>
                    </div>
                  </div>
                
                </div>
            )
          }else{
            return <div/>
          }
      }
    }
  }
    

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            userState : state.userState,
            abilityState : state.abilityState
          }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      deleteProvidedLanguage : userLanguageActions.deleteProvidedLanguage,
      fetchAbilities : abilityActions.fetchAbilities
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ProvidedLanguagesOptions));