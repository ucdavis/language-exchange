import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
import HomeSearch from '../components/home/HomeSearch';

class Home extends Component{
    state = {
        redirect : false
    }

    render(){
        // const {redirect} = this.state;
        let home = null;
        if( this.props.userState.current && this.props.userState.current.id ){
          home = <HomeSearch/>     
        }else{
            this.setState({ redirect: true });
            return <Redirect to='/users/register'/>;
        }

        return(
            <div>
              { home }

                <div className="card-group">

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header text-white bg-dark">Search</div>
                        <div className="card-body">
                            <h5 className="card-title">Find a partner</h5>
                            <p className="card-text">Use the TLE search tool to find your language exchange partner.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-warning text-white">Contact</div>
                        <div className="card-body">
                            <h5 className="card-title">Send Messages</h5>
                            <p className="card-text">Contact your partner through the message system to establish a meeting.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-primary text-white">Improve</div>
                        <div className="card-body">
                            <h5 className="card-title">Enhance your Skills</h5>
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
    return bindActionCreators({ fetchCasUser: userActions.fetchCasUser}, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));