import React, { Component } from 'react';
import SearchUsers from '../../containers/user/SearchUsers';
import SearchUsersResults from '../../containers/user/SearchUsersResult';

class HomeSearch extends Component{

    render(){
        return(
                <div>
                         <div>
                            <div className="card border-secondary bg-light mt-3 mb-3">
                            <div className="card-header border-secondary bg-secondary">
                                Find a Partner
                            </div>
                                <div className="card-body">
                                    <SearchUsers/>
                                </div>
                            </div>

                            <div className="card border-secondary bg-light mt-3 mb-3">
                            <div className="card-header border-secondary bg-secondary">
                                Search Result
                            </div>
                                <div className="card-body">
                                    <SearchUsersResults/>
                                </div>
                            </div>

                        </div> 
                </div> 

        )
    }

}

export default HomeSearch