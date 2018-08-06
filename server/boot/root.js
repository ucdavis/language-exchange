'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // Shows loopback status on root /, uncoment when ENV = dev
  // router.get('/', server.loopback.status());
  // Serves files in configured public directory. uncomment when ENV != dev
  router.get('/');

  server.use(router);
};
