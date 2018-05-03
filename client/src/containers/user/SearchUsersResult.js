import React, { Component } from 'react';
import UsersResult from '../../components/user/SearchUsersResult';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class SearchUsersResult extends Component{
    
    render(){ 
        const userState = this.props.userState;    
        return (
            <div>
                <UsersResult state= {userState}/>
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