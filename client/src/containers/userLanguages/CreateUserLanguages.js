import React from 'react';
import LanguageSelection from '../../components/userLanguage/LanguageSelection';
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions'
import * as userActions from '../../actions/userActions';
import * as abilityActions from '../../actions/abilityActions';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CreateUserLanguages extends React.Component {
  // constructor (props){
  //   super(props);
  //   this.state = {
  //     redirect : false,
  //   }
  // }

  componentDidMount = () => {
    this.props.fetchCurrentUser();
    this.props.fetchLanguages();
    this.props.fetchAbilities();
    const current_user_id = this.props.userState.current.id;
    this.props.fetchUserProvidedLanguages(current_user_id);
    this.props.fetchUserDesiredLanguages(current_user_id);  
  }

  submit = values => {
    // values.abilityLanguage.map((ability, desiredLanguage_id)=>{

    //       var now = new Date();
    //       let desiredLanguageUpdate = {
    //         id : desiredLanguage_id,
    //         ability : ability,
    //         updated_at : now
    //       } 
    //       // this.props.updateDesiredLanguages(desiredLanguageUpdate);     
    //       console.log(desiredLanguageUpdate);
      console.log(values);
    //   return desiredLanguageUpdate;   
    // })

  }


  render() {
    if(this.props.userState.fetching || this.props.userLanguageState.fetching){
      return <h5>...Loading user and languages</h5>
    }else{
    
      return (
        <div>
          <h2>Desired Languages</h2>
          <LanguageSelection
            languages={this.props.languageState.languages}
            abilities={this.props.abilityState.abilities}
          />
        </div>
      )
    }

  }
}

function mapStateToProps(state){
    return{ userState : state.userState ,
            userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            abilityState : state.abilityState
    }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchAbilities : abilityActions.fetchAbilities,
      fetchCurrentUser : userActions.fetchCurrentUser,
      fetchLanguages : languageActions.fetchLanguages,
      fetchUserProvidedLanguages : userLanguageActions.fetchUserProvidedLanguages,
      fetchUserDesiredLanguages: userLanguageActions.fetchUserDesiredLanguages
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUserLanguages));