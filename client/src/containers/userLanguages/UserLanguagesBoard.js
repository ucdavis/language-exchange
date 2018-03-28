import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import * as languageActions from '../../actions/languageActions';
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
        }
        
  }

  render() {


    if (this.props.userState.fetching || this.props.userLanguageState.fetching){
      return(<h5>..loading User</h5>);
    }else{
      let desiredLanguages = this.props.userLanguageState.userDesiredLanguages;
      let abilities = this.props.abilityState.abilities;
      return (

        <div className="row">
        <div className="col-sm-12">
              <div className="side-bar">
                <div className="btn-group" role="group" aria-label="button group">
                
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => this.setState({
                        display:[
                          <ProvidedLanguageSelection key="ProvidedLanguageSelection" />,
                          <ProvidedLanguagesOptions key="ProvidedLanguagesOptions"/>
                        ]
                      })} >
                      &nbsp;Languages I know&nbsp;
                    </button>

                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => this.setState({
                        display:[
                        <DesiredLanguageSelection key="DesiredLanguageSelection" desiredLanguages = {desiredLanguages} />,
                        <DesiredLanguagesOptions key="DesiredLanguagesOptions" desiredLanguages = { desiredLanguages } abilities = { abilities }/>
                        ]
                      })} >
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
      fetchAbilities : abilityActions.fetchAbilities
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UserLanguagesBoard));