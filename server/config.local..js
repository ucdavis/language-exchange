'use strict';

// var env = (process.env.NODE_ENV || 'development');
// var maintenanceMode = env === 'maintenance';

module.exports = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT
};