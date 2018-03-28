import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import { withRouter } from 'react-router-dom';
import DesiredLanguagesOption from '../../components/userLanguage/DesiredLanguagesOption';

class DesiredLanguagesOptions extends React.Component {

  deleteDesiredLanguage = (desiredLanguageId,user_id)=>{
    this.props.deleteDesiredLanguage(desiredLanguageId,user_id);
  }

  render() {

    const desiredLanguages = this.props.userLanguageState.userDesiredLanguages.map(language => {
      return(
        
        <li className="list-group-item" key = {language.id}>
        <DesiredLanguagesOption
          form = {'DesiredLanguagesOption_'+language.language.name}
          onSubmit={ this.submit }
          languageName = {language.language.name}
          initialValues = {{ability:language.ability}}
          desiredLanguageId = {language.id}
          deleteDesiredLanguage = {this.deleteDesiredLanguage}
          user_id = {language.user_id}
          ability = {language.abilities.name}
        />
        </li>
      )
    })

  if(desiredLanguages.length){
      return (
          <div>
            <ul className="list-group list-group-flush">
            { desiredLanguages }
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
      deleteDesiredLanguage : userLanguageActions.deleteDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DesiredLanguagesOptions));