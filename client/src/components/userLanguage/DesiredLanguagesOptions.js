import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userLanguageActions from "../../actions/userLanguageActions";
import { withRouter } from 'react-router-dom';
import DesiredLanguagesOption from '../../components/userLanguage/DesiredLanguagesOption';
import Img from 'react-image';


class DesiredLanguagesOptions extends React.Component {

  deleteDesiredLanguage = (desiredLanguageId,user_id)=>{
    this.props.deleteDesiredLanguage(desiredLanguageId,user_id);
  }

  render() {
    const loading = '/api/storages/images/download/loading.gif';


    const desiredLanguages = this.props.userLanguageState.userDesiredLanguages.map(language => {
      return(  
          <div key = {language.id} className="col-sm-4">
          <DesiredLanguagesOption
            form = {'DesiredLanguagesOption_'+language.language.name}
            onSubmit={ this.submit }
            languageName = {language.language.name}
            initialValues = {{ability:language.ability}}
            desiredLanguageId = {language.id}
            deleteDesiredLanguage = {this.deleteDesiredLanguage}
            user_id = {language.user_id}
            ability = {language.abilities}
          />
          </div>
        )
      })

    if (this.props.userLanguageState.fetching ){
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
        if(desiredLanguages.length){
            return (
              <div>

                  <div className="row">
                  <div className="col-sm-12">
                  <div className="card">
                  <div className="card-body">

                    <div className="card-group">

                      { desiredLanguages }

                    </div>
                    </div>
                  </div>
                
                </div>
                </div>
                </div>
            )
          }else{
            return <div/>
          }
      }
    }
  }
    

function mapStateToProps(state){
    return{ userLanguageState: state.userLanguageState,
            languageState : state.languageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      deleteDesiredLanguage : userLanguageActions.deleteDesiredLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DesiredLanguagesOptions));