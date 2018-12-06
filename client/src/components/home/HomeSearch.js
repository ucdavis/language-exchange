import React, { Component } from 'react';
import SearchUsers from '../../containers/user/SearchUsers';
import SearchUsersResults from '../../containers/user/SearchUsersResult';


class HomeSearch extends Component{

    render(){
        return(

            <div>
                <div className="card border-info bg-light  mt-3 mb-3">
                    <div className="card-header border-dark text-dark bg-secondary">
                    Search for a partner
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