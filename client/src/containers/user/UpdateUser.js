import React from 'react';
import { bindActionCreators } from "redux";
import UpdateUserForm from '../../components/user/UpdateUserForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';

class UpdateUser extends React.Component {
  componentWillMount(){
    this.props.fetchUser(this.props.match.params.id);
  }

  submit = values => {
    let now = new Date();
    let cas_user = "casUser"
    const newUser= {
        id :this.props.match.params.id,
        cas_user : cas_user,
        available : values.available,
        user_name : values.userName,
        email_confirmed : values.emailConfirmed,
        notify_by_email : values.emailNotifications,
        email : values.email,
        gender : values.gender,
        description : values.aditionalInformation,
        affiliation : values.affiliation,
        field_of_study: values.field,
        updated_at : now,
    }
    console.log(newUser)
    this.props.updateUser(newUser);
  }
  render() {
    return <UpdateUserForm onSubmit={this.submit} state={this.props.userState} />
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ updateUser : userActions.updateUser, fetchUser: userActions.fetchUser }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUser));