import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';

class Logout extends Component{

    componentDidMount(){
        this.props.userLogout();
    }


    render(){
        return(
            <a href='/logout' className="btn btn-danger">Close Session</a>
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
            userLogout: userActions.userLogout,
        }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Logout));