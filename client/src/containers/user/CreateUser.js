import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserForm from '../../components/user/UserForm';
import * as userActions from "../../actions/userActions";
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class CreateUser extends React.Component {
  state = {
    redirect : false
  }

  componentDidMount(){
    this.props.fetchCasUser(); 
}

  submit = values => {
    let cas_user = this.props.userState.cas_user;
    let now = new Date();
    
    const newUser= {
        cas_user : cas_user,
        available : values.available,
        user_name : values.user_name,
        email_confirmed : values.emailConfirmed,
        notify_by_email : values.emailNotifications,
        email : values.email,
        gender : values.gender,
        description : values.description,
        affiliation : values.affiliation,
        field_of_study: values.field,
        updated_at : now,
        created_at : now
    }
    this.props.createUser(newUser);
    this.setState({ redirect: true })
  }
  render() {
    const {redirect} = this.state;
    if (redirect) {
      const new_user_id = this.props.userState.created.id;
      const redirect_url = `/userlanguages/edit/${new_user_id}`;
      return <Redirect to={redirect_url}  />;
    }else{
      return <UserForm onSubmit={this.submit} />

    }
    
  }
}

function mapStateToProps(state){
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
      createUser : userActions.createUser,
      fetchCasUser : userActions.fetchCasUser  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUser));