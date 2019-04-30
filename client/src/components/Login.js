import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import Img from 'react-image';
import loading from '../assets/images/loading.gif';

class Login extends Component{

    componentDidMount(){
        this.props.fetchCasUser();
        this.props.fetchCurrentUser();
    }

    register_login(){
        this.props.updateUserLogin();
    }

    render(){
        let fetching = this.props.userState.fetchingUser;
        let casAuth = this.props.userState.cas_user;

        if (fetching){
            return(
                <div>
                    <div className="card mt-3">
                        <div className="card-body text-center">
                            <Img src={ loading } />
                        </div>
                    </div>
                </div>
            )
        }

        if( casAuth ){
            let userId=this.props.userState.current.id;
            if( userId ){
                this.register_login();
                return <Redirect to='/users/home'/>;  
            }else{
                return <Redirect to='/users/register'/>;  
            }
        }else{
            return <Redirect to='/welcome'/>;  

        }
    }
}

function mapStateToProps(state){
    return{
        userState: state.userState
    }
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({
            fetchCurrentUser: userActions.fetchCurrentUser,
            fetchCasUser: userActions.fetchCasUser,
            updateUserLogin: userActions.updateUserLogin
        }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login));