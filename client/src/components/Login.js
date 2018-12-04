import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import Img from 'react-image';

class Login extends Component{

    componentDidMount(){
        this.props.fetchCasUser();
        this.props.fetchCurrentUser();
    }

    register_login(){
        this.props.updateUserLogin();
    }

    render(){
        let userId=this.props.userState.current.id;
        let casAuth = this.props.userState.cas_user;
        let fetching = this.props.userState.fetchingUser;
        let loading = '/api/storages/images/download/loading.gif';
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
        if(  !casAuth  ){
            return <Redirect to='/welcome'/>;  
        }
        if( casAuth && casAuth!==null && !userId ){
            return <Redirect to='/users/register'/>;  
        }
        if( casAuth && userId ){
            this.register_login();
            return <Redirect to='/users/home'/>;  
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