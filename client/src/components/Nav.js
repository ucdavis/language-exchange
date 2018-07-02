import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';
import Img from 'react-image';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  render() {
    let authUser = this.props.userState.current;
    var logo = '/api/storages/images/download/logo.png';
    
    if(this.props.userState.current){
      let admin_menu = "";
      if(authUser.user_type){
        admin_menu = (
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={ '/admin/dashboard' } className="dropdown-item">Dashboard</Link>
              <Link to={ '/admin/users' } className="dropdown-item">Users</Link>
              <Link to={ '/admin/languages' } className="dropdown-item">Languages</Link>
            </div>
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
                  <Link to={ '/users/home' } className="nav-link">Home <span className="sr-only">(current)</span></Link> 
                </li>
                <li className="nav-item">
                  <Link to={ '/users/messages' } className="nav-link">Messages</Link> 
                </li>
                <li className="nav-item">
                  <Link to={ '/users/languages' } className="nav-link">Languages</Link>
                </li>
                <li className="nav-item">
                  <Link to={ '/users/guide' } className="nav-link">Conversation Guide</Link>
                </li>
                <li className="nav-item">
                  <Link to={ '/users/profile' } className="nav-link">{authUser.user_name} &#9662;</Link>
                </li>
              </ul>
              <ul className="navbar-nav">  
                  { admin_menu}

                <li className="nav-item pull-right">
                  <a className="nav-link btn btn-sm btn-outline-secondary" onClick={ this.props.userLogout}  href="/logout" >Logout</a>
                </li>
              </ul>
            </div>
          </div>
          </nav>
        </div>
      );
    }else{
      return(
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
                  <a className="nav-link btn btn-sm btn-outline-secondary" onClick={ this.props.userLogout}  href="/logout" >Logout</a>
                </li>

              </ul>
            </div>
          </div>
          </nav>
        </div>
      )
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
      userLogout: userActions.userLogout
    }, dispatch)
  }

  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Nav));