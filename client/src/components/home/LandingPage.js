import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import Img from 'react-image';
import banner from '../../assets/images/tle-banner.jpg';
import loading from '../../assets/images/loading.gif';

class Home extends Component{
    state = {
        redirect : false
    }
    componentDidMount(){
        this.props.fetchCasUser();
        this.props.fetchCurrentUser();
    }

    render(){
        let fetching = this.props.userState.fetchingUser;
        let casAuth = this.props.userState.cas_user;

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

        if( casAuth ){
            return <Redirect to='/users/home'/>;
        }

        return(
            <div>
                <div className="card mt-3">
                   <Img className="img-fluid rounded" alt="TLE Banner" src={ banner } />
                </div>
                
                <div className="card mt-3 border-info">
                    <div className="card-body text-center">
                        <h3 className="mt-0">Welcome to TLE <span role="img" aria-label="chat">&nbsp;😀💬</span> </h3>
                        <p className="lead">This program helps a native speaker of one language to find a native <br/>speaker of another language to help each other in language learning.</p>
                    </div>
                </div>

                

                <div className="card-group mt-3">

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
                            <h5 className="card-title"><span role="img" aria-label="wave">👋</span>&nbsp;Send messages </h5>
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
            fetchCasUser: userActions.fetchCasUser,
        }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));