import React from 'react';
import { bindActionCreators } from "redux";
import SearchUsersForm from '../../components/user/SearchUsersForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';

class SearchUser extends React.Component {
  submit = values => {
    const gender= {
        gender : values.gender,
    }
    this.props.searchUsers(gender);
  }
  render() {
    return <SearchUsersForm onSubmit={this.submit} />
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ searchUsers : userActions.searchUsers }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SearchUser));
