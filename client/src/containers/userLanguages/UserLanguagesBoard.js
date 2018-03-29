import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as abilityActions from '../../actions/abilityActions';
import { withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../../actions/userActions';
import DesiredLanguagesOptions from '../../components/userLanguage/DesiredLanguagesOptions';
import DesiredLanguageSelection from "../../containers/userLanguages/DesiredLanguageSelection"
import ProvidedLanguagesOptions from '../../components/userLanguage/ProvidedLanguagesOptions';
import ProvidedLanguageSelection from "../../containers/userLanguages/ProvidedLanguageSelection"

class UserLanguagesBoard extends React.Component {
  constructor (props){
    super(props);
    this.showView = this.showView.bind(this);
    this.state = {
      redirect : false,
      display : []
    }
  }

  showView = (view)=>{
    this.setState({ display:view });
  }

  toggleDesiredButton=()=> {
    var optionButton= document.getElementById("desiredButton");
    var providedButton = document.getElementById("providedButton");
    if (optionButton.className === "btn btn-default") {
      optionButton.className = "btn btn-default active";
      providedButton.className = "btn btn-default";
    }else if(optionButton.className ===  "btn btn-default active"){
      optionButton.className =  "btn btn-default active"
    } else {
      optionButton.className = "btn btn-default";
    }
  }
  toggleProvidedButton=()=> {
    var optionButton= document.getElementById("providedButton");
    var desiredButton= document.getElementById("desiredButton");
    if (optionButton.className === "btn btn-default") {
      optionButton.className = "btn btn-default active";
      desiredButton.className = "btn btn-default";
    }else if(optionButton.className ===  "btn btn-default active"){
      optionButton.className =  "btn btn-default active"
    } else {
      optionButton.className = "btn btn-default";
    }
  }

  componentDidMount = () => {
    this.props.fetchAbilities();
    this.setState({
      display:[
        <ProvidedLanguageSelection key="ProvidedLanguageSelection" />,
        <ProvidedLanguagesOptions key="ProvidedLanguagesOptions"/>
      ]
    });
    fetchCurrentUser()
    if (this.props.userState.current !== null){
          const id = this.props.userState.current.id;
          this.props.fetchUserDesiredLanguages(id); 
          this.props.fetchUserProvidedLanguages(id);         
        }
        
  }

  showDesired = () => {
    this.setState({
        display:[
        <DesiredLanguageSelection key="DesiredLanguageSelection" />,
        <DesiredLanguagesOptions key="DesiredLanguagesOptions" />
        ]
      });
      
      this.toggleDesiredButton();
    }

  showProvided = () => {
    this.setState({
      display:[
        <ProvidedLanguageSelection key="ProvidedLanguageSelection" />,
        <ProvidedLanguagesOptions key="ProvidedLanguagesOptions"/>
      ]
      });
      this.toggleProvidedButton();
    }

  render() {



    if (this.props.userState.fetching || this.props.userLanguageState.fetching){
      return(<h5>..loading</h5>);
    }else{

      return (

        <div className="row">
        <div className="col-sm-12">
              <div className="side-bar pull-right">
                <div className="btn-group" role="group" aria-label="button group">
                
                    <button
                      type="button"
                      id = "providedButton"
                      className="btn btn-default active"
                      data-toggle="button"
                      onClick={this.showProvided} >
                      &nbsp;Languages I know&nbsp;
                    </button>

                    <button
                      type="button"
                      id = "desiredButton"
                      className="btn btn-default"
                      data-toggle="button"
                      onClick={this.showDesired} >
                      &nbsp;Languages I'm learning&nbsp;
                    </button>

                  </div>
                </div>
              <div>
            </div>
        </div>

        <div className="col-sm-12">
        
            <div>
              { this.state.display }
            </div>
        </div>

      </div>
      )
    }
  }
}

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            userState : state.userState,
            abilityState : state.abilityState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchCurrentUser : fetchCurrentUser,
      fetchUserDesiredLanguages : userLanguageActions.fetchUserDesiredLanguages,
      fetchUserProvidedLanguages : userLanguageActions.fetchUserProvidedLanguages,
      fetchAbilities : abilityActions.fetchAbilities
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UserLanguagesBoard));