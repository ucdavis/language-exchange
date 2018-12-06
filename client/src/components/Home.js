import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import HomeSearch from '../components/home/HomeSearch';
import {Link} from 'react-router-dom';
import Img from 'react-image';

class Home extends Component{

    componentDidMount(){
        this.props.fetchCasUser();
        this.props.fetchCurrentUser();
    }

    render(){

        let fetching = this.props.userState.fetchingUser;
        let loading = '/api/storages/images/download/loading.gif';
        let casAuth = this.props.userState.cas_user;
        let current = this.props.userState.current;
        let home;
        

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
            return <Redirect to='/'/>;  
        }



        if( casAuth && current ){
 
            home = <HomeSearch/>  
            
            var alertMessage;
            if (!this.props.userState.current.available ){
                alertMessage = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <h5 className="alert-heading">Unavailable</h5>
                    <p>You are not available, your data will not show up in search results for others to contact you.<br/>
                    You can edit your <a href="/users/edit"> profile </a> and check the "Available" box to make yourself available again.</p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>    
                )
            }

            return(
                <div>
                { alertMessage }

                    <div className="card mt-3 border-info">
                    <div className="card-body text-center">
                        <h3 className="mt-0">Welcome to TLE <span role="img" aria-label="chat">&nbsp;😀💬</span> </h3>
                        <p className="lead">This program helps a native speaker of one language to find a native <br/>speaker of another language to help each other in language learning.</p>
                            <Link to={'/users/guide'}>This is how it works.</Link>
                        </div>
                    </div>
                { home }

                    <div className="card-group">

                        <div className="card bg-light mb-3" styles="max-width: 18rem;">
                            <div className="card-header text-white bg-dark">Search</div>
                            <div className="card-body">
                                <h5 className="card-title"><span role="img" aria-label="search">🔎</span>&nbsp;Find a partner</h5>
                                <p className="card-text">Use the TLE search tool to find your language exchange partner.</p>
                            </div>
                        </div>

                        <div className="card bg-light mb-3" styles="max-width: 18rem;">
                            <div className="card-header bg-warning text-white">Contact</div>
                            <div className="card-body">
                                <h5 className="card-title"><span role="img" aria-label="wave">👋 </span>&nbsp;Send Messages</h5>
                                <p className="card-text">Contact your partner through the message system to establish a meeting.</p>
                            </div>
                        </div>

                        <div className="card bg-light mb-3" styles="max-width: 18rem;">
                            <div className="card-header bg-primary text-white">Improve</div>
                            <div className="card-body">
                                <h5 className="card-title"><span role="img" aria-label="graph">📈</span>&nbsp;Enhance your Skills</h5>
                                <p className="card-text">The clearest path to fluency is finding a language exchange partner.</p>
                            </div>
                        </div>    

                    </div>

                </div>
            )
        } else{
            return <Redirect to='/users/register'/>;
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
        fetchCasUser: userActions.fetchCasUser,
        fetchCurrentUser: userActions.fetchCurrentUser,
    
    }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));