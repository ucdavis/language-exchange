import React from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => (
      <div className="row" >
        <div className="col-sm-12">
          <Nav />         
          <Main />
          <Footer />
        </div>
      </div>
    )
    
export default App;
