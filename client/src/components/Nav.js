import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import { withRouter } from 'react-router-dom';

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
  
  let user_name = "Unregistered";
  if( this.props.userState.current !== null ){
    user_name = this.props.userState.current.user_name;
  }
    
    // const { location } = this.props;
     const { collapsed } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass}>
            <ul className="nav navbar-nav">
              <li >
                <Link to="/" onClick={this.toggleCollapse.bind(this)}>Home</Link>
              </li>
              <li >
                <Link to="/languages" onClick={this.toggleCollapse.bind(this)}>Languages</Link>
              </li>
              <li >
                <Link to="/users" onClick={this.toggleCollapse.bind(this)}>Users</Link>
              </li>
              <li >
                <Link to="/file" onClick={this.toggleCollapse.bind(this)}>Files</Link>
              </li>
              <li >
                <Link to="/messages" onClick={this.toggleCollapse.bind(this)}>Messages</Link>
              </li>
              <li >
                <a href="/logout" onClick={this.toggleCollapse.bind(this)}>Logout</a>
              </li>
              <li >
                <a href="/users/languages" onClick={this.toggleCollapse.bind(this)}>My Languages</a>
              </li>
              <li >
                <Link to="/users/profile" onClick={this.toggleCollapse.bind(this)}>
                  <span className="glyphicon glyphicon glyphicon-user" aria-hidden="true"></span>
                  &nbsp;{ user_name }
                </Link>
              </li>
            </ul>
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
  return bindActionCreators({ fetchCasUser: userActions.fetchCasUser,
    fetchCurrentUser: userActions.fetchCurrentUser }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Nav));