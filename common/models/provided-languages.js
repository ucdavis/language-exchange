'use strict';

module.exports = function(Providedlanguages) {

    var getPromise=function(sqlString, param){
        var promise = new Promise((resolve, reject) => { 
            var ds = Providedlanguages.dataSource;
            var sql = sqlString;
            ds.connector.query(sql, [param], function (err, result ) {
                if (err)reject(err);
                resolve( result );
            });
        });
        return promise;
    }


    // Hook, adds sender_id to req.body before adding new  language to user
    Providedlanguages.beforeRemote('create', function(ctx, unused, next) {
            if(ctx.req.session.cas_user) {
                var param = ctx.req.session.cas_user;
                var sql ="select id from partner where cas_user = ?";
                var getUserId = getPromise(sql, param, ctx);
                getUserId.then((result)=>{
                    var id = result[0].id;
                    ctx.req.body['user_id']=id;
                    next();
                });
            } else {
            next(new Error('Must be logged in'))
            }
        });


    // Hook, checks owner before deleting language
    Providedlanguages.beforeRemote('deleteById', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            var param = ctx.req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPromise(sql, param, ctx);
            getUserId.then((result)=>{
                var id = result[0].id;
                var idToDelete = ctx.req.params.id
                var sql ="select user_id from provided_languages where id = ?";
                var getOwnerid = getPromise(sql,idToDelete, ctx)
                getOwnerid.then((result)=>{
                    var ownerid = result[0].user_id;
                    if(ownerid == id){
                        next();
                    }
                    else{
                        next(new Error('Not Owner'))
                    }
                });
            });
        } else {
        next(new Error('Must be logged in'))
        }
    });

};
