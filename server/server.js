'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

var userType = require('./userType.js');
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
// TODO: secret key
app.use( session({
  secret            : 'super_zsecret_key',
  resave            : false,
  saveUninitialized : true,
  cookie: {
    httpOnly: false,
    secure: false,
  },
}));
 
var cas = new CASAuthentication({
    cas_url         : 'https://ssodev.ucdavis.edu/cas/',
    service_url     : 'http://localhost:3000',
    cas_version     : '3.0',
    renew           : false,
    session_name    : 'cas_user',
    destroy_session : false,
    is_dev_mode     : false,
    dev_mode_user   : 'admin',
});


// Check all requests for authentication
// TODO : Solve 'No Access-Control-Allow-Origin' Error
app.use(function (req, res, next) {
  var user_name = null;

  if(user_name = req.session[cas.session_name]) {
    console.log("\n CAS session found : ", user_name);
    next();
  } else {
    // No username in session, need to log in
    console.log("No CAS session found");
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    cas.bounce(req, res, next);       
  }
});



// LANGUAGES API

// function getLanguages( req, res, next, user_type ) {
//   console.log("Ejecuting getLanguages. User Type:", user_type)

//   if(user_type){
//     let db = new sqlite3.Database('./server/db/dev.sqlite3');
//     let sql = `SELECT id, name,short_name FROM languages
//               ORDER BY name`;
    
//     db.all(sql, [], (err, results) => {
//       if (err) {
//         console.error(err);
//         res.statusCode = 500;
//         return res.json({ errors: ['Could not retrieve data'] });
//       }
//       // No results returned mean the object is not found
//       if (results.length === 0) {
//         // We are able to set the HTTP status code on the res object
//         res.statusCode = 404;
//         return res.json({ errors: ['Not Found'] });
//       }

//      req.languages = results;
//      db.close();
//       next();
//     });
//   }
//   if(!user_type){
//     res.sendStatus(403);
//   }

// }


// function resolveLanguages(req, res, next){
//   var cas_user = req.session[cas.session_name];
//   console.log("Asking for :",cas_user)
//   userType(req,res, next, getLanguages, cas_user);
// }

// app.get('/api/languages', function(req,res){
//   res.send(req.languages);
// })


// This route will de-authenticate the client with the Express server and then 
// redirect the client to the CAS logout page. 
app.get( '/logout', cas.logout );

// API sends current authenticated user

app.get( '/api/partners/cas_user', cas.bounce, function(req, res){
  res.send(req.session[cas.session_name]);
} );

app.get('/users*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.get('/admin*',function(req,res){
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
