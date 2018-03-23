import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import { withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../../actions/userActions';
import DesiredLanguagesOptions from '../../components/userLanguage/DesiredLanguagesOptions';
import LanguageSelection from "../../components/userLanguage/LanguageSelection"

class CreateUserLanguages extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      redirect : false
    }
  }

  componentDidMount = () => {
    this.props.fetchLanguages();
    this.props.fetchAbilities();
    fetchCurrentUser()
    if (this.props.userState.current !== null){
          const id = this.props.userState.current.id;
          this.props.fetchUserProvidedLanguages(id);
          this.props.fetchUserDesiredLanguages(id);
          this.props.fetchLanguages();
        }
        
  }




  render() {
    // const {redirect} = this.state;


    if (this.props.userState.fetching || this.props.userLanguageState.fetching || this.props.abilityState.fething ){
      return(<h5>..loading User</h5>);
    }else{
      let desired = this.props.userLanguageState.userDesiredLanguages;
      let abilities = this.props.abilityState.abilities;
      return (
        <div>
          <h2>Languages I'm learning</h2>
          <label>Select the name and the level of the language you are learning , then add it to your list.</label>
          <LanguageSelection />
          <label>List of languages I am learning</label>
          <DesiredLanguagesOptions desired = { desired } abilities = { abilities }/>

      </div>
      )
    }
  }
}

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            userState : state.userState,
            abilityState : state.abilityState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchCurrentUser : fetchCurrentUser,
      fetchUserProvidedLanguages : userLanguageActions.fetchUserProvidedLanguages,
      fetchUserDesiredLanguages : userLanguageActions.fetchUserDesiredLanguages,
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUserLanguages));