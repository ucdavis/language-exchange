'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var errorHandler = require('strong-error-handler');
const morgan = require('morgan');

require('dotenv').config()

// Required for cas_authentication module
var session = require('express-session');
var CASAuthentication = require('cas-authentication');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};


// Set up an Express session, which is required for CASAuthentication.
app.use( session({
  secret            : process.env.SESSION_SECRET_KEY,
  resave            : false,
  saveUninitialized : true,
  cookie: {
    httpOnly: false,
    secure: false,
  },
}));
 
var cas = new CASAuthentication({
    cas_url         : process.env.CAS_URL,
    service_url     : process.env.CAS_SERVICE_URL,
    cas_version     : '3.0',
    renew           : true,
    session_name    : process.env.CAS_SESSION_NAME,
    destroy_session : true,
    is_dev_mode     : process.env.CAS_DEV_MODE,
    dev_mode_user   : process.env.CAS_DEV_MODE_USER
});

//Morgan
app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stderr
}));

app.use(morgan('combined', {
  skip: function (req, res) {
      return res.statusCode >= 400
  }, stream: process.stdout
}));

// If environment is maintenance, show off line page
let publicDir = 'client/app';
var envVar = process.env.NODE_ENV;

app.get('/', function (req, res) {
  if( envVar == 'maintenance'){ 
    res.sendFile(path.resolve(__dirname, 'client/maintenance', 'index.html'));
  }else{
    res.sendFile(path.resolve(__dirname, 'client/app', 'index.html'));
  }
});

// This route will de-authenticate the client with the Express server and then 
// redirect the client to the CAS logout page. 
app.get( '/logout', function(req,res){
  var cas_logout = process.env.CAS_LOGOUT;
  // Destroy the entire session, and CAS session variables.
  req.session.destroy(function(err) {
    if (err) {
        console.log(err);
    }
    // Redirect the client to the CAS logout.
    res.redirect(cas_logout);
  });
});


// API gets current authenticated user
app.get( '/api/partners/cas_user', cas.bounce, function(req, res){
  res.send(req.session[cas.session_name]);
} );

// Server status
app.get( '/status', function(req, res){
  res.status(200).send({
    success: 'true',
    message: 'TLE Server Running OK',
  })
} );

app.get('/welcome', function (req, res){
  res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});

app.get('/users/*', cas.bounce, function (req, res){
  res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});

app.get('/admin/*', cas.bounce, function(req,res){
      res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});


app.use(errorHandler({
  debug: app.get('env') === 'development',
  log: true,
}));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
