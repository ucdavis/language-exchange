import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as abilityActions from '../../actions/abilityActions';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchCurrentUser } from '../../actions/userActions';
import DesiredLanguagesOptions from '../../components/userLanguage/DesiredLanguagesOptions';
import DesiredLanguageSelection from "../../containers/userLanguages/DesiredLanguageSelection";
import ProvidedLanguagesOptions from '../../components/userLanguage/ProvidedLanguagesOptions';
import ProvidedLanguageSelection from "../../containers/userLanguages/ProvidedLanguageSelection";
import Img from 'react-image';
import loading from '../../assets/images/loading.gif';

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


  showDesired = () => {
    this.setState({
        display:[
        <DesiredLanguageSelection key="DesiredLanguageSelection" showProvided = {this.showProvided} />,
        <DesiredLanguagesOptions key="DesiredLanguagesOptions" />
        ]
      });
    }

    showProvided = () => {
      this.setState({
        display:[
          <ProvidedLanguageSelection key="ProvidedLanguageSelection" showDesired={this.showDesired}/>,
          <ProvidedLanguagesOptions key="ProvidedLanguagesOptions"/>
        ]
        });
      }
    
  componentDidMount = () => {
    this.props.fetchAbilities();
    this.setState({
      display:[
        <ProvidedLanguageSelection key="ProvidedLanguageSelection"  showDesired={this.showDesired}/>,
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

  render() {
    const authUser = this.props.userState.cas_user;
    if( !authUser ){
        return <Redirect to='/users/register'/>;  
    }
    if (this.props.userState.fetching || this.props.userLanguageState.fetching){
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
      return (
        <div>
            { this.state.display }
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