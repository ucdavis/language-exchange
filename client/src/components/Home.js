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

    componentDidMount(){
        this.props.fetchCasUser();
    }

    render(){
        // const {redirect} = this.state;
        let home = null;
        if( this.props.userState.current !== null ){
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
                        <div className="card-header text-white bg-dark">Find a partner</div>
                        <div className="card-body">
                            <h5 className="card-title">Information</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-warning text-white">Read your Messages</div>
                        <div className="card-body">
                            <h5 className="card-title">Information</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-primary text-white">Improve your Skills</div>
                        <div className="card-body">
                            <h5 className="card-title">Information</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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