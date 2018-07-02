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

    render(){
        const authUser = this.props.userState.current;
        var loading = '/api/storages/images/download/loading.gif';
        if( !authUser ){
            return <Redirect to='/users/register'/>;  
        }
        else if(authUser){
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
    return bindActionCreators({ fetchCurrentUser: userActions.fetchCurrentUser}, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));