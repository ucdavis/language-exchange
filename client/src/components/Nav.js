import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';
import Img from 'react-image';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  componentDidMount(){
    this.props.fetchCurrentUser();
  }

  render() {
    var logo = '/api/storages/images/download/logo.png';
    let fetching = this.props.userState.fetchingUser;
    let authUser = this.props.userState.current;
    let cas_user = this.props.userState.cas_user;
    let authUserId = this.props.userState.current.id;

    const RegisterBar = (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <Img src={ logo } />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={ '/users/register' } className="nav-link">Register<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item pull-right">
                <a className="nav-link btn btn-sm btn-outline-warning" href="/logout" >Logout</a>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      </div>
    )
    const WelcomeBar = (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <Img src={ logo } />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

          </div>
        </div>
        </nav>
      </div>
    )

    if(  !cas_user ){
      return ( WelcomeBar )
  }
    
    if( !fetching && !authUserId && cas_user ){
      return ( RegisterBar )
  }
    if(authUserId && !fetching && cas_user ){
      let admin_menu = "";
      if(authUser.user_type){
        admin_menu = (
          <li className="nav-item">
              <Link to={ '/admin/dashboard' } className="nav-link">Admin &#9662;</Link>
          </li>
        )
      };

      return (  
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <Img src={ logo } />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={ '/users/home' } className="nav-link">Search<span className="sr-only">(current)</span></Link> 
                </li>
                <li className="nav-item">
                  <Link to={ '/users/messages' } className="nav-link">My Messages</Link> 
                </li>
                <li className="nav-item">
                  <Link to={ '/users/languages' } className="nav-link">My Languages</Link>
                </li>
                <li className="nav-item">
                  <Link to={ '/users/profile' } className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to={ '/users/guide' } className="nav-link">Guide</Link>
                </li>

              </ul>
              <ul className="navbar-nav">  
                  { admin_menu}

                <li className="nav-item pull-right">
                  <a className="nav-link btn btn-sm btn-outline-warning" href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
          </nav>
        </div>
      );
    }

    return ( RegisterBar )

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
      userLogout: userActions.userLogout
    }, dispatch)
  }

  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Nav));