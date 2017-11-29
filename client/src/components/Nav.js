import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component{
    constructor(){
        super();
        this.state ={
            collapsed:true
        }
    }

    toggleCollapse(){
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render(){
        
        return(
            // <!-- Navigation -->
                <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-data-target">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    </div>
                    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                    <div className="collapse navbar-collapse" id="navbar-data-target">
                    <ul className="nav navbar-nav">
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/languages">Languages</Link>
                        </li>
                        <li>
                        <Link to="/Users">Users</Link>
                        </li>
                    </ul>
                    </div>
                    {/* <!-- /.navbar-collapse --> */}
                </div>
                {/* <!-- /.container --> */}
                </div>
            );
        }
    }

    export default Nav;