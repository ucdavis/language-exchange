import React from 'react';
import { bindActionCreators } from "redux";
import SearchUsersForm from '../../components/user/SearchUsersForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as languageActions from "../../actions/languageActions";
import { withRouter } from 'react-router-dom';


class SearchUser extends React.Component {
  componentWillMount(){
    this.props.fetchLanguages();
  }

  submit = values => {
    let searchParams= {
        gender : values.gender,
        provided : values.provided,
        desired : values.desired
    }
    this.props.searchUsers(searchParams.gender, searchParams.provided, searchParams.desired);
  }
  render() {
    return(
      <div className="row">
       <div className="col-lg-12">
        <SearchUsersForm onSubmit={this.submit} languages = {this.props.languageState.languages} />
       </div>
   </div>  
    )
  }
}

function mapStateToProps(state){
    return { userState : state.userState, languageState : state.languageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ searchUsers : userActions.searchUsers, fetchLanguages : languageActions.fetchLanguages }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SearchUser));
