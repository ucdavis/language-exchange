'use strict';
let app = require('../../server/server');


module.exports = function(Storage) {

    var getPromise=function(sqlString, param){
        var Partner = app.models.Partner;
        var promise = new Promise((resolve, reject) => { 
            var ds = Partner.dataSource;
            var sql = sqlString;
            ds.connector.query(sql, [param], function (err, result ) {
                if (err)reject(err);
                resolve( result );
            });
        });
        return promise;
    }

 // Hook, checks owner before upload file
    Storage.beforeRemote('upload', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            var param = ctx.req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPromise(sql, param, ctx);
            getUserId.then((result)=>{
                var idToUpdate = ctx.req.params.container
                    if(idToUpdate == result[0].id){
                        next();
                    }
                    else{
                        next(new Error('Not Allowed'))
                    }
            });
        } else {
        next(new Error('Must be logged in'))
        }
    });

};