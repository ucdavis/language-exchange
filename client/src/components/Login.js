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

    register_login(user){
        var date = new Date();
        user.last_login = date.toISOString();
        this.props.updateUserLogin(user);
    }

    render(){
        const authUser = this.props.userState.current;
        var fetching = this.props.userState.fetching;
        var loading = '/api/storages/images/download/loading.gif';
        if( !authUser ){
            return <Redirect to='/users/register'/>;  
        }
        else if(authUser){
            if(fetching){
                return <Img src={ loading } />
            }
            this.register_login(authUser);
            return <Redirect to='/users/home'/>;  
        }

        return(
            <div>
                <div className="card mt-3">
                    <div className="card-body text-center">
                        <Img src={ loading } />
                    </div>
                </div>
            </div>
        );
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