import React from 'react';
import { bindActionCreators } from "redux";
import UpdateUserForm from '../../components/user/UpdateUserForm';
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import * as flashMessageActions from '../../actions/flashMessageActions'

class UpdateUser extends React.Component {
  
  componentDidMount(){
    this.props.fetchCurrentUser();
}

  submit = values => {
    let cas_user = this.props.userState.current.cas_user;
    let user_id = this.props.userState.current.id;


    const newUserData= {
        id : user_id,
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
    }
    this.props.updateUser(newUserData);
    this.props.sendFlashMessage("Profile updated!!", "alert-success");
  }
  render() {
    const authUser = this.props.userState.current;
    if( !authUser ){
      return <Redirect to='/users/register'/>;  
  }
    
    return (
      <div>
        <div className="row">
            <div className="col-sm-12"> 
                <div className="card mt-3">
                  <div className="card-header bg-dark text-white">
                      My Profile
                  </div>
                  <div className="card-body">
                    <UpdateUserForm onSubmit={this.submit}  />
                  </div>
                </div>
              </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
    return { userState : state.userState,
             flashMessage : state.flashMessage
          }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
        fetchCurrentUser: userActions.fetchCurrentUser,
        updateUser : userActions.updateUser,
        sendFlashMessage: flashMessageActions.sendFlashMessage
      }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateUser));