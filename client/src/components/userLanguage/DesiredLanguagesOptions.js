import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
// import * as languageActions from '../../actions/languageActions'
import { withRouter } from 'react-router-dom';
// import { fetchCurrentUser } from '../../actions/userActions';
import DesiredLanguagesOption from '../../components/userLanguage/DesiredLanguagesOption';

class CreateUserLanguages extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      redirect : false,

    }
  }

  submit = values => {
    console.log("Values:",values);
  }

  deleteDesiredLanguage = (desiredLanguageId,user_id)=>{
    this.props.deleteDesiredLanguage(desiredLanguageId,user_id);
  }

  render() {

    const desiredLanguages = this.props.desired.map(language => {
      return(
        <li className="list-group-item" key = {language.id}>
        <DesiredLanguagesOption
          form = {'form_'+language.language.name}
          onSubmit={ this.submit }
          languageName = {language.language.name}
          initialValues = {{ability:language.ability}}
          desiredLanguageId = {language.id}
          deleteDesiredLanguage = {this.deleteDesiredLanguage}
          user_id = {language.user_id}
          ability = {language.abilities.name}
          abilities = {this.props.abilities}
        />
        </li>
      )
    })

      return (
          <div>
            <ul className="list-group list-group-flush">
            { desiredLanguages }
            </ul>
        </div>
      )
    }
  }
    

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchProvidedLanguages : userLanguageActions.fetchProvidedLanguages,
      fetchDesiredLanguages : userLanguageActions.fetchDesiredLanguages,
      deleteDesiredLanguage : userLanguageActions.deleteDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUserLanguages));