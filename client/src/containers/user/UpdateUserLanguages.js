import React from 'react';
import { bindActionCreators } from "redux";
// import LanguageSelectionForm from '../../components/userLanguage/LanguageSelectionForm';
import DesiredLanguagesForm from "../../components/userLanguage/DesiredLanguagesForm";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions'
import { withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../../actions/userActions';

class UpdateUserLanguages extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      redirect : false,
      fetching : this.props.userState.fetching,
      fetchingLanguages : this.props.userLanguageState.fetching

    }
  }

  componentDidMount = () => {
    fetchCurrentUser()
    if (this.props.userState.current !== null){
          const id = this.props.userState.current.id;
          this.props.fetchProvidedLanguages(id);
          this.props.fetchDesiredLanguages(id);
          this.props.fetchLanguages();
        }
        
  }

  submit = values => {
    // const newDesiredLanguages = this.props.state.userLanguageState.desiredLanguages;
    // const newProvidedLanguages = this.props.state.userLanguageState.providedLanguages;

    // console.log(newDesiredLanguages);
    // console.log(newProvidedLanguages);
    console.log(values);
    //this.props.updateUser(newUser);
  }


  render() {
    const {fetching, fetchingLanguages} = this.state;
    if (fetchingLanguages){
      return(<h5>..fetching languages</h5>);
    }
    
    if(fetching){
      return <h2>..Loading User</h2>
    }else{
      let languages = this.props.languageState.languages;
    
      return (
        <div>
          <h2>Languages I'm learning</h2>
          <DesiredLanguagesForm
            onSubmit={ this.submit }
            userLanguageState = {this.props.userLanguageState}
            languages = { languages }
          />

      </div>
      )
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
      fetchProvidedLanguages : userLanguageActions.fetchProvidedLanguages,
      fetchDesiredLanguages : userLanguageActions.fetchDesiredLanguages,
      fetchLanguages : languageActions.fetchLanguages
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUserLanguages));