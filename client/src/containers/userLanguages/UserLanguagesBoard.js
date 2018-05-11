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

  toggleProvidedButton=()=> {
    var providedButton= document.getElementById("providedButton");
    var desiredButton= document.getElementById("desiredButton");
    if (providedButton.className === "btn btn-outline-info nav-item nav-link") {
      providedButton.className = "btn btn-info nav-item nav-link";
      desiredButton.className = "btn btn-outline-info nav-item nav-link";
    }else if(providedButton.className ===  "btn btn-info nav-item nav-link"){
      providedButton.className =  "btn btn-info nav-item nav-link"
    } else {
      providedButton.className = "btn btn-outline-info nav-item nav-link";
    }
  }

  toggleDesiredButton=()=> {
    var desiredButton= document.getElementById("desiredButton");
    var providedButton = document.getElementById("providedButton");
    if (desiredButton.className === "btn btn-outline-info nav-item nav-link") {
      desiredButton.className = "btn btn-info nav-item nav-link";
      providedButton.className = "btn btn-outline-info nav-item nav-link";
    }else if(desiredButton.className ===  "btn btn-info nav-item nav-link"){
      desiredButton.className =  "btn btn-info nav-item nav-link"
    } else {
      desiredButton.className = "btn btn-outline-info nav-item nav-link";
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


    // if (this.props.userState.fetching || this.props.userLanguageState.fetching){
    //   return(<h5>..loading</h5>);
    // }else{

      return (
        <div>
          <div className="row">
            <div className="col-sm-12">

              <div className="alert alert-danger  alert-dismissible fade show mt-2" role="alert">
                <strong>Help!</strong> Make sure to complete both well known and learning languages below.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <nav className="nav nav-pills nav-fill mt-3">
                  <button
                    type="button"
                    id = "providedButton"
                    className="btn btn-info nav-item nav-link"
                    onClick={this.showProvided} >
                    Languages I know
                  </button>

                  <button
                    type="button"
                    id = "desiredButton"
                    className="btn btn-outline-info nav-item nav-link"
                    onClick={this.showDesired} >
                    Languages I'm learning
                  </button>
                </nav>
            
            <div className="card">
              <div className="card-body"> 
                { this.state.display }
              </div>
            </div>
          </div>
        </div>

      </div>
      )
    }
  // }
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