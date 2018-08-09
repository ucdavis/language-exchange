import React, { Component } from 'react';
import UsersResult from '../../components/user/SearchUsersResult';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Img from 'react-image';

class SearchUsersResult extends Component{
    
    render(){ 
        var fetching = this.props.userState.fetching;
        const loading = '/api/storages/images/download/loading.gif';
        const userState = this.props.userState;
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