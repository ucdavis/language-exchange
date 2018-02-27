import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';
import CreateUser from '../containers/user/CreateUser';
import HomeSearch from '../components/home/HomeSearch';

class Home extends Component{

    componentDidMount(){
        this.props.fetchCasUser();
    }

    render(){

        let home = <CreateUser/>;

        if( this.props.userState.current !== null ){
          home = <HomeSearch/>     
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