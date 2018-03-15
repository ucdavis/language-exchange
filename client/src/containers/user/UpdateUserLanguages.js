import React from 'react';
import { bindActionCreators } from "redux";
// import LanguageSelectionForm from '../../components/userLanguage/LanguageSelectionForm';
import DesiredLanguagesForm from "../../components/userLanguage/DesiredLanguagesForm";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
// import * as languageActions from '../../actions/languageActions'
import { withRouter } from 'react-router-dom';


class UpdateUserLanguages extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      redirect : false
    }
  }

  componentDidMount = () => {
    const current_user_id = this.props.userState.current.id;
    this.props.fetchProvidedLanguages(current_user_id);
    this.props.fetchDesiredLanguages(current_user_id);
        
  }

  submit = values => {

    // let user_id = this.props.userState.current.id;
    
    values.abilityLanguage.map((ability, desiredLanguage_id)=>{

          var now = new Date();
          let desiredLanguageUpdate = {
            id : desiredLanguage_id,
            ability : ability,
            updated_at : now
          } 
          this.props.updateDesiredLanguages(desiredLanguageUpdate);     
          // console.log(desiredLanguageUpdate);
      
      return desiredLanguageUpdate;   
    })

  }


  render() {
    
    return (
      <div>
        <h2>Desired Languages</h2>
        <DesiredLanguagesForm
          onSubmit={ this.submit }
          userLanguageState = {this.props.userLanguageState}
        />
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
      updateProvidedLanguages : userLanguageActions.updateProvidedLanguages,
      updateDesiredLanguages : userLanguageActions.updateDesiredLanguages
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUserLanguages));