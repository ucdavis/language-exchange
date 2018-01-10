import React, { Component } from 'react';
import SearchUsers from '../containers/user/SearchUsers';
import SearchUsersResults from '../containers/user/SearchUsersResult';

class Home extends Component{
    render(){
        return(
            <div>
                <h2>Language Exchange App</h2>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="well well-sm">
                         <SearchUsers/>
                        </div>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-lg-12">
                        <div >
                        <SearchUsersResults/>
                        </div>
                    </div>
                </div> 

                <div className="row">
                <div className="col-md-4">
                    <h3>Heading 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe rem nisi accusamus error velit animi non ipsa placeat. Recusandae, suscipit, soluta quibusdam accusamus a veniam quaerat eveniet eligendi dolor consectetur.</p>
                    <a className="btn btn-default" href="/">More Info</a>
                </div>

                <div className="col-md-4">
                    <h3>Heading 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe rem nisi accusamus error velit animi non ipsa placeat. Recusandae, suscipit, soluta quibusdam accusamus a veniam quaerat eveniet eligendi dolor consectetur.</p>
                    <a className="btn btn-default" href="/languages">More Info</a>
                </div>

                <div className="col-md-4">
                    <h3>Heading 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe rem nisi accusamus error velit animi non ipsa placeat. Recusandae, suscipit, soluta quibusdam accusamus a veniam quaerat eveniet eligendi dolor consectetur.</p>
                    <a className="btn btn-default" href="/users">More Info</a>
                </div>

                </div>
         </div>
        );
    }
}

export default Home;
