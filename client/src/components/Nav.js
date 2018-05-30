import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';
import Img from 'react-image';

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      
    };
  }

  componentDidMount(){
      this.props.fetchCurrentUser();
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {

    let authUser = this.props.userState.current;
    const server = "http://localhost:3000";
    var url = `${server}/api/storages/images/download/logo.png`;
    

    if(this.props.userState.current){
      let admin_menu = "";
      
      if(authUser.user_type){
        admin_menu = (
        <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Admin
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/admin/dashboard">Dashboard</a>
                        <a className="dropdown-item" href="/users">Users</a>
                        <a className="dropdown-item" href="/languages">Languages</a>
                      </div>
                    </li>
        )
      };

      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <Img src={ url } />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users/messages">Messages</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users/languages">Languages</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/guide">Conversation Guide</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users/profile">Profile</a>
                </li>
                
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
    }else{
      return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <Img src={ url } />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/users/register">Register <span className="sr-only">(current)</span></a>
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
    return bindActionCreators({ fetchCasUser: userActions.fetchCasUser,
      fetchCurrentUser: userActions.fetchCurrentUser }, dispatch)
  }

  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Nav));