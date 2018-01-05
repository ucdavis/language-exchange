import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';
import SearchUserForm from '../../components/user/SearchUserForm';

class SearchUsers extends React.Component {
   submit = values => {
    const gender = {
        gender : values.gender,
    }
    this.props.searchUsers(gender);
  }
  render() {
    return <SearchUserForm onSubmit={this.submit} />
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ searchUsers : userActions.searchUser }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SearchUsers));