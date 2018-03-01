import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter, Redirect } from 'react-router-dom';
// import CreateUser from '../containers/user/CreateUser';
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