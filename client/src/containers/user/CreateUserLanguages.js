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
    const toggleSelection=()=> {
      toggleButton();
      var languageSelection = document.getElementById("languageSelection");
      if (languageSelection.style.display === "none") {
        languageSelection.style.display = "block";
      } else {
        languageSelection.style.display = "none";
      }
    }

    const toggleButton=()=> {
      var newLanguageButton= document.getElementById("newLanguageButton");
      if (newLanguageButton.style.display === "none") {
        newLanguageButton.style.display = "block";
      } else {
        newLanguageButton.style.display = "none";
      }
    }

    const initialStyle = {
      display: "none"
    };

    const initialStyleButton = {
      display: "block"
    };


    if (this.props.userState.fetching || this.props.userLanguageState.fetching || this.props.abilityState.fething ){
      return(<h5>..loading User</h5>);
    }else{
      let desiredLanguages = this.props.userLanguageState.userDesiredLanguages;
      let abilities = this.props.abilityState.abilities;
      return (
        <div className="row">

            <div className="col-sm-6 well">
              <h2>Languages I'm learning</h2>
              <div className="row">
                  <div className="col-sm-12" id="languageSelection" style={initialStyle}>         
                  <LanguageSelection desiredLanguages = {desiredLanguages} />
                  </div> 

                  <div className="col-sm-12">
                  <DesiredLanguagesOptions desiredLanguages = { desiredLanguages } abilities = { abilities }/>
                  </div>

                  <div className="col-sm-12">
                  <button className="btn btn-success"  id="newLanguageButton" style={initialStyleButton} onClick={toggleSelection}>+ New Language</button>
                  </div>
              </div>
            </div>

            <div className="col-sm-6 well">
              <h2>Languages I know</h2>
              <div className="row">
                  <div className="col-sm-12" id="languageSelection" style={initialStyle}>         
                  <LanguageSelection desiredLanguages = {desiredLanguages} />
                  </div> 

                  <div className="col-sm-12">
                  <DesiredLanguagesOptions desiredLanguages = { desiredLanguages } abilities = { abilities }/>
                  </div>

                  <div className="col-sm-12">
                  <button className="btn btn-success"  id="newLanguageButton" style={initialStyleButton} onClick={toggleSelection}>+ New Language</button>
                  </div>
              </div>
            </div>
    
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