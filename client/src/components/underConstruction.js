import React, { Component } from 'react';
import Img from 'react-image';


class underConstruction extends Component{

    render() {
        var logo = '/api/storages/images/download/logo.png';
        
          return (  
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
              <div className="container">
                
                  <Img src={ logo } />


              </div>
              </nav>

            <div>
                <h2>TLE Web Application is Under Maintenance</h2>
                <h5>Please come back later!</h5>
            </div>
            <br />
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

            </div>
          );
    
    
      }
    }
  
  export default underConstruction;