import React, { Component } from 'react';
import UsersResult from '../../components/user/SearchUsersResult';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class SearchUsersResult extends Component{
    
    render(){        
        return (
            <div>
                <UsersResult state= {this.props.userState}/>
            </div>       
        )
    }
}

function mapStateToProps(state){
    return{
        userState: state.userState
    }
}

export default withRouter( connect(mapStateToProps)(SearchUsersResult));