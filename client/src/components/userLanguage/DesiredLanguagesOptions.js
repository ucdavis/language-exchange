import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions'
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

  componentDidMount = () => {
    // this.props.fetchLanguages();
  //   fetchCurrentUser()
  //   if (this.props.userState.current !== null){
  //         const id = this.props.userState.current.id;
  //         this.props.fetchProvidedLanguages(id);
  //         this.props.fetchDesiredLanguages(id);
  //         this.props.fetchLanguages();
  //       }
        
  }


  submit = values => {
    // const newDesiredLanguages = this.props.state.userLanguageState.desiredLanguages;
    // const newProvidedLanguages = this.props.state.userLanguageState.providedLanguages;

    // console.log(newDesiredLanguages);
    // console.log(newProvidedLanguages);
    console.log("Values:",values);
    //this.props.updateUser(newUser);
  }


  render() {

    const desiredLanguages = this.props.desired.map(language => {
      return(
        <li className="list-group-item" key = {language.id}>
        <DesiredLanguagesOption
          form = {'form_'+language.languages.name}
          onSubmit={ this.submit }
          languageName = {language.languages.name}
          initialValues = {{ability:language.ability}}     
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
      fetchLanguages : languageActions.fetchLanguages
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUserLanguages));