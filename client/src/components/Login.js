import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import Img from 'react-image';

class Home extends Component{

    componentDidMount(){
        this.props.fetchCurrentUser();
    }

    register_login(){
        this.props.updateUserLogin();
    }

    render(){
        let userId;
        let casAuth = this.props.userState.cas_user;
        if (this.props.userState.current && this.props.userState.current.id){
            userId = this.props.userState.current.id
        }
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
            if( !userId ){
                return <Redirect to='/users/register'/>;  
            }
            if(userId){
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
            updateUserLogin: userActions.updateUserLogin
        }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));