import React, { Component } from 'react';
import SearchUsers from '../../containers/user/SearchUsers';
import SearchUsersResults from '../../containers/user/SearchUsersResult';

class HomeSearch extends Component{

    render(){
        return(
<div>
<h2>Language Exchange App</h2>

            <div>
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
         </div>


</div>

        )
    }

}

export default HomeSearch