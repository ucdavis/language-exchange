import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';


class Home extends Component{
    state = {
        redirect : false
    }

    render(){


        return(
            <div>
                <h4 className="mt-0">Welcome to Tandem Language Exchange (TLE)</h4>
                <div className="card-group">

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header text-white bg-dark">Search</div>
                        <div className="card-body">
                            <h5 className="card-title">Find a partner</h5>
                            <p className="card-text">Use the TLE search tool to find your language exchange partner.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-warning text-white">Contact</div>
                        <div className="card-body">
                            <h5 className="card-title">Send Messages</h5>
                            <p className="card-text">Contact your partner through the message system to establish a meeting.</p>
                        </div>
                    </div>

                    <div className="card bg-light mb-3" styles="max-width: 18rem;">
                        <div className="card-header bg-primary text-white">Improve</div>
                        <div className="card-body">
                            <h5 className="card-title">Enhance your Skills</h5>
                            <p className="card-text">The clearest path to fluency is finding a language exchange partner.</p>
                        </div>
                    </div>

                </div>
                <div>
                   {/* <br/> <a className="btn btn-lg" href="https://dev-tle.ucdavis.edu/users/home">Login</a> */}
                   <br/> <a className="btn btn-lg" href="http://localhost:5001/users/home">Login</a>
                </div>


            </div>
        );
    }
}


  
  export default withRouter( Home );