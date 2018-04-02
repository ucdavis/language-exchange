import React, { Component } from 'react';
import SearchUsers from '../../containers/user/SearchUsers';
import SearchUsersResults from '../../containers/user/SearchUsersResult';

class HomeSearch extends Component{

    render(){
        return(

            <div>
                <div className="jumbotron">
                    <h4 className="mt-0">Welcome to Tandem Language Exchange</h4>
                    <p className="lead">This program helps a native speaker of one language to find a native speaker of another language to help each other in language learning</p>
                </div>

                            <div className="card border-info  mt-3 mb-3">
                            <div className="card-header border-info text-white bg-info">
                               Find a Partner
                            </div>
                                <div className="card-body">
                                    <SearchUsers/>
                                </div>
                            </div>

                  

                            <div className="card border-info mt-3 mb-3">
                            <div className="card-header border-info text-white bg-info">
                                Search Result
                            </div>
                                <div className="card-body">
                                    <SearchUsersResults/>
                                </div>
                            </div>
            </div>

                       
                

        )
    }

}

export default HomeSearch