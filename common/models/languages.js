'use strict';
const sqlite3 = require('sqlite3').verbose();
module.exports = function(Languages) {

        // Custom Remote Method for getting a

        Languages.remoteMethod('getLanguages', {
            // accepts: {arg: 'cas_user', type: 'string', required: true},
            http: {path: '/getLanguages', verb: 'get'},
            returns: { arg:'data', type: ['Language'], root: true}
            
        });
    
        Languages.getLanguages = function( cb) {
            console.log("Ejecuting MyAPI getLanguages.")

              var ds = Languages.dataSource;
              var sql ="SELECT id, name, short_name FROM languages ORDER BY name";

              ds.connector.query(sql, function (err, languages) {
                if (err) console.error(err);
                cb(err, languages);
            });
                      
          }
    
        // Languages.getLanguages = function( cb) {
        //     console.log("Ejecuting MyAPI getLanguages.")
        //       let db = new sqlite3.Database('./server/db/dev.sqlite3');
        //       let sql = `SELECT id, name,short_name FROM languages
        //                 ORDER BY name`;
        //       db.all(sql, [], (err, results) => {
        //         if (err) {
        //           console.error(err);
        //           return results.json({ errors: ['Could not retrieve data'] });
        //         }
        //         // No results returned mean the object is not found
        //         if (results.length === 0) {
        //           // We are able to set the HTTP status code on the res object
        //           return results.json({ errors: ['Not Found'] });
        //         }
        //         // return results;
        //        console.log(results);
        //        db.close();
        //       }), function(err, res) { 
        //         cb(null, res);
        //     }
        //   }

};
