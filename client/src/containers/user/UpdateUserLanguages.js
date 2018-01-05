import React from 'react';
import { bindActionCreators } from "redux";
// import LanguageSelectionForm from '../../components/userLanguage/LanguageSelectionForm';
import LanguageSelection from "../../components/userLanguage/LanguageSelection";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import { withRouter } from 'react-router-dom';

class UpdateUserLanguages extends React.Component {

  componentWillMount = () => {
    const id = this.props.match.params.id;
        this.props.fetchProvidedLanguages(id);
        this.props.fetchDesiredLanguages(id);
  }

  submit = values => {
    const newDesiredLanguages = this.props.state.userLanguageState.desiredLanguages;
    const newProvidedLanguages = this.props.state.userLanguageState.providedLanguages;

    console.log(newDesiredLanguages);
    console.log(newProvidedLanguages);
    //this.props.updateUser(newUser);
  }


  render() {
    
    return (
      <div>
        <h1>My Profile</h1>
        <LanguageSelection onSubmit={ this.submit } state = {this.props.userLanguageState} />
    </div>
    )
  }
}

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchProvidedLanguages : userLanguageActions.fetchProvidedLanguages,
      fetchDesiredLanguages : userLanguageActions.fetchDesiredLanguages
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUserLanguages));