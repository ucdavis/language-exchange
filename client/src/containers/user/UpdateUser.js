import React from 'react';
import { bindActionCreators } from "redux";
import UpdateUserForm from '../../components/user/UpdateUserForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';

class UpdateUser extends React.Component {

  componentWillMount = () => {
    this.props.fetchUser(this.props.match.params.id);
    console.log(this.state);
  }

  submit = values => {
    let now = new Date();
    let cas_user = "casUser"
    const newUser= {
        id :this.props.match.params.id,
        cas_user : cas_user,
        available : values.available,
        user_name : values.user_name,
        email_confirmed : values.email_confirmed,
        notify_by_email : values.notify_by_email,
        email : values.email,
        gender : values.gender,
        description : values.description,
        affiliation : values.affiliation,
        field_of_study: values.field_of_study,
        created_at : this.props.userState.active.created_at,
        updated_at : now,
    }
    this.props.updateUser(newUser);
  }
  render() {
    
    return (
      <div>
        <h1> My Profile</h1>
        <UpdateUserForm onSubmit={this.submit} state={this.props.userState} fetchUser={this.fetchUser} />
    </div>
    )
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ updateUser : userActions.updateUser, fetchUser: userActions.fetchUser }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUser));