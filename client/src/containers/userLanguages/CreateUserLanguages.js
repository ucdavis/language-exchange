import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import { withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../../actions/userActions';
import DesiredLanguagesOptions from '../../components/userLanguage/DesiredLanguagesOptions';
import DesiredLanguageSelection from "../../containers/userLanguages/DesiredLanguageSelection";
import ProvidedLanguagesOptions from '../../components/userLanguage/ProvidedLanguagesOptions';
import ProvidedLanguageSelection from "../../containers/userLanguages/ProvidedLanguageSelection";
import Img from 'react-image';

class CreateUserLanguages extends React.Component {
  constructor (props){
    super(props);
    this.showView = this.showView.bind(this);
    this.state = {
      redirect : false,
      display : null
    }
  }

  showView = (view)=>{
    this.setState({ display:view });
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
    const loading = '/api/storages/images/download/loading.gif';
    const toggleDesiredSelection=()=> {
      toggleDesiredButton();
      var desiredLanguageSelection = document.getElementById("desiredLanguageSelection");
      if (desiredLanguageSelection.style.display === "none") {
        desiredLanguageSelection.style.display = "block";
      } else {
        desiredLanguageSelection.style.display = "none";
      }
    }

    const toggleDesiredButton=()=> {
      var newDesiredLanguageButton= document.getElementById("newDesiredLanguageButton");
      if (newDesiredLanguageButton.style.display === "none") {
        newDesiredLanguageButton.style.display = "block";
      } else {
        newDesiredLanguageButton.style.display = "none";
      }
    }

    const toggleProvidedSelection=()=> {
      toggleProvidedButton();
      var providedLanguageSelection = document.getElementById("providedLanguageSelection");
      if (providedLanguageSelection.style.display === "none") {
        providedLanguageSelection.style.display = "block";
      } else {
        providedLanguageSelection.style.display = "none";
      }
    }

    const toggleProvidedButton=()=> {
      var newProvidedLanguageButton= document.getElementById("newProvidedLanguageButton");
      if (newProvidedLanguageButton.style.display === "none") {
        newProvidedLanguageButton.style.display = "block";
      } else {
        newProvidedLanguageButton.style.display = "none";
      }
    }

    const initialStyle = {
      display: "none"
    };

    const initialStyleButton = {
      display: "block"
    };


    if (this.props.userState.fetching || this.props.userLanguageState.fetching || this.props.abilityState.fething ){
      return(
        <div>
            <div className="card mt-3">
                <div className="card-body text-center">
                    <Img src={ loading } />
                </div>
            </div>
        </div>
      )
    }else{
      let desiredLanguages = this.props.userLanguageState.userDesiredLanguages;
      let providedLanguages = this.props.userLanguageState.userProvidedLanguages;
      let abilities = this.props.abilityState.abilities;
      return (
        <div className="row">

            <div className="col-sm-6 well">
              <h2>Languages I'm learning</h2>
              <div className="row">
                  <div className="col-sm-12" id="desiredLanguageSelection" style={initialStyle}>         
                  <DesiredLanguageSelection desiredLanguages = {desiredLanguages} />
                  </div> 

                  <div className="col-sm-12">
                  <DesiredLanguagesOptions desiredLanguages = { desiredLanguages } abilities = { abilities }/>
                  </div>

                  <div className="col-sm-12">
                  <button className="btn btn-success"  id="newDesiredLanguageButton" style={initialStyleButton} onClick={toggleDesiredSelection}>+ New Language</button>
                  </div>
              </div>
            </div>

            <div className="col-sm-6 well">
              <h2>Languages I know</h2>
              <div className="row">
                  <div className="col-sm-12" id="providedLanguageSelection" style={initialStyle}>         
                  <ProvidedLanguageSelection providedLanguages = {providedLanguages} />
                  </div> 

                  <div className="col-sm-12">
                  <ProvidedLanguagesOptions providedLanguages = { providedLanguages } abilities = { abilities }/>
                  </div>

                  <div className="col-sm-12">
                  <button className="btn btn-success"  id="newProvidedLanguageButton" style={initialStyleButton} onClick={toggleProvidedSelection}>+ New Language</button>
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