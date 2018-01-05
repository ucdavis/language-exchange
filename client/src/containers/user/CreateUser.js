import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserForm from '../../components/user/UserForm';
import * as userActions from "../../actions/userActions";
import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateUser extends React.Component {
  submit = values => {
    const casUser = "casUser";
    let now = new Date();
    const newUser= {
        cas_user : casUser,
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
        created_at : now
    }
    this.props.createUser(newUser);
  }
  render() {
    return <UserForm onSubmit={this.submit} />
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ createUser : userActions.createUser }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUser));