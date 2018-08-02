'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // comment this for testing changes on DEV
  // router.get('/', server.loopback.status());
  // uncomment this instead
   router.get('/');
  
  // AND add this to middleware.json "files" object
    // "loopback#static": {
    //   "params": "$!./client" 
    //  }

  server.use(router);
};
