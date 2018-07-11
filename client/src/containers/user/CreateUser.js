import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserForm from '../../components/user/UserForm';
import * as userActions from "../../actions/userActions";
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class CreateUser extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      redirect : false
    }
  }

  componentDidMount(){
    this.props.fetchCasUser();
    this.props.fetchCurrentUser();
}

  submit = values => {
    let cas_user = this.props.userState.cas_user;
    
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
    }
    this.props.createUser(newUser);
    console.log('CreateUser')
    this.setState({ redirect: true })
    console.log('Redirect')
  }
  render() {
    if (this.props.userState.fetching){
      return <h5>...Loading</h5>
    }
    const {redirect} = this.state;
    const authUser = this.props.userState.current;
      
    
      if (!authUser ) {
        return (
          <div>
            <div className="row">
              <div className="col-sm-12"> 
                  <div className="card mt-3">
                    <div className="card-header bg-dark text-white">
                        Registration Form
                    </div>
                    <div className="card-body">
                      <UserForm onSubmit={this.submit} />
                    </div>
                </div>
              </div>
            </div>
        </div>
        )
        
      }else if(authUser && redirect){
        return <Redirect to='/users/languages' />;
      }else{
        return <Redirect to='/' />;

      }
    
    
  }
}

function mapStateToProps(state){
    return { userState : state.userState,
             userlanguageState : state.userlanguageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
      createUser : userActions.createUser,
      fetchCasUser : userActions.fetchCasUser,
      fetchCurrentUser: userActions.fetchCurrentUser  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateUser));