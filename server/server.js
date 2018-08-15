'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var nodemailer = require('nodemailer');
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
// TODO: secret key
app.use( session({
  secret            : 'llave_super_secret_key',
  resave            : false,
  saveUninitialized : true,
  cookie: {
    httpOnly: false,
    secure: false,
  },
}));
 
var cas = new CASAuthentication({
    cas_url         : process.env.CAS_URL,
    service_url     : process.env.SERVICE_URL,
    cas_version     : '3.0',
    renew           : true,
    session_name    : 'cas_user',
    destroy_session : true,
    is_dev_mode     : process.env.IS_DEV_MODE,
    dev_mode_user   : process.env.DEV_MODE_USER
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
if( envVar == 'maintenance'){ publicDir = 'client/app' }


// Check all requests for authentication
app.use(function (req, res, next) {
  var user_name = null;

  if(user_name = req.session[cas.session_name]) {
    console.log("\n CAS user found: ", user_name);
    next();
  } else {
    // No username in session, need to log in
    console.log("No CAS user found");
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    cas.bounce(req, res, next);       
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

app.get('/users*', function (req, res){
  res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});

app.get('/admin*',function(req,res){
      res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});

// NODEMAILER
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.ucdavis.edu',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
  }
  // Allow unauthorized domains (when running from localhost)
  // ,
  // tls:{
  //   rejectUnauthorized:false
  // }
});

var name = "Mauricio"
var output = `<b>Hello ${name} </b>`

// setup email data with unicode symbols
let mailOptions = {
  from: '"TLE UC Davis" <tle-no-reply@ucdavis.edu>', // sender address
  to: 'bar@example.com, baz@example.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
