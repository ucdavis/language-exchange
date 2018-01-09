import React from 'react';
import { bindActionCreators } from "redux";
import SearchUsersForm from '../../components/user/SearchUsersForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';
import SearchUsersResults from '../../containers/user/SearchUsersResult';


class SearchUser extends React.Component {
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
        <SearchUsersForm onSubmit={this.submit} />
        <SearchUsersResults/>
       </div>
   </div>  
    )
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ searchUsers : userActions.searchUsers }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SearchUser));
