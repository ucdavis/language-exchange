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
    if (this.props.userState.fetching || this.props.userLanguageState.fetching){
      return(<h5>...loading</h5>);
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