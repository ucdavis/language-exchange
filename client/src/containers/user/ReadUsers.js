import React, { Component } from 'react';
import Users from '../../components/user/Users';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter } from 'react-router-dom';

class ReadUsers extends Component{
    componentDidMount(){
        this.props.fetchCurrentUser();
        this.props.fetchUsers();
    }
    
    render(){
        const authUser = this.props.userState.current;
        if( authUser.user_type){       
            return (
                <div>
                    <Users state= {this.props.userState} fetchUsers = {this.props.fetchUsers}/>
                </div>       
            )
        }else{
            return ( <div> <h4> 403 Forbidden - User Not Authorized </h4></div> )
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
        fetchUsers: userActions.fetchUsers,
        fetchCurrentUser: userActions.fetchCurrentUser
    }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ReadUsers));