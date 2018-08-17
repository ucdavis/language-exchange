import React, { Component } from 'react';
import SearchUsers from '../../containers/user/SearchUsers';
import SearchUsersResults from '../../containers/user/SearchUsersResult';
import {Link} from 'react-router-dom';

class HomeSearch extends Component{

    render(){
        return(

            <div>
                <div className="card mt-3 border-info">
                    <div className="card-body">
                        <h4 className="mt-0">Welcome to Tandem Language Exchange (TLE)</h4>
                        <p className="lead">This program helps a native speaker of one language to find a native speaker of another language to help each other in language learning.
                        <Link to={'/users/guide'}>This is how it works.</Link></p>
                    </div>
                </div>

                <div className="card border-info bg-light  mt-3 mb-3">
                    <div className="card-header border-dark text-dark bg-secondary">
                    Search Tool
                    </div>
                    <div className="card-body">
                        <SearchUsers/>
                    </div>
                </div>
        
                <div>
                        <SearchUsersResults/>
                </div>

            </div>
        )
    }

}

export default HomeSearch