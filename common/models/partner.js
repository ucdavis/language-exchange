'use strict';


module.exports = function(Partner) {

var provided_languages = Partner.relations[provided_languages];
var desired_languages = Partner.relations[desired_languages];

var getPromise=function(sqlString, param){
    var promise = new Promise((resolve, reject) => { 
        var ds = Partner.dataSource;
        var sql = sqlString;
        ds.connector.query(sql, [param], function (err, result ) {
            if (err)reject(new Error('Something went wrong getting Promise'));
            resolve(result);
        });
    });
    return promise;
}


// Function for saving login time
Partner.remoteMethod('updateUserLogin', {
    accepts:{arg: "req", type: "object", http: {source: "req"}},
    http: {path: '/savelogin', verb: 'patch'},
    returns: {type: 'array', root: true}
    }
);

Partner.updateUserLogin = function(req, cb) {
    var param = req.session.cas_user;
    var sql ="update partner set last_login = datetime('now') where cas_user = ?";
    var ds = Partner.dataSource;
    ds.connector.query(sql, [param], function (err, result ) {
        if (err)console.log(err);
        cb(null, result)
    });

}
     

// Function for getting Authenticated user
Partner.remoteMethod('getAuthUser', {
    accepts:{arg: "req", type: "object", http: {source: "req"}},
    http: {path: '/authenticated', verb: 'get'},
    returns: {type: 'array', root: true}
    
});

Partner.getAuthUser = function(req, cb) {
    var cas_user = req.session.cas_user;
        Partner.findOne({
            where: {cas_user: cas_user},                
            fields:{
                email_conf_code:false,
                email_confirmed:false,
                avatar_content_type:false,
                avatar_file_size: false,
                avatar_updated_at: false,
                created_at:false,
                updated_at:false,
                last_login:false
                }
        }, function(err, res) { 
        cb(null, res);
    });    
    }
      
// Function for Searching users by language and gender
Partner.remoteMethod('searchPartner',{
        accepts:[
            {arg:'speaks', type:'number', required: true},
            {arg:'learns', type:'number', required: true},
            {arg:'gender', type:'string', required: true}
        ],
        http: {
            path:'/searchPartner/:speaks/:learns/:gender',
            verb: 'get'
        },
        returns:{
            arg:'Result',
            type:'array',
            root: true
        }
}
);

Partner.searchPartner = function(speaks,learns,gender,cb){
    let filter = "";

    var searchHiddenFields= {
        cas_user :false,
        email :false,
        avatar_file_name :false,
        notify_by_email :false,
        affiliation :false,
        field_of_study :false,
        created_at :false,
        updated_at :false,
        user_type :false,
        last_login :false
    };
    if( gender !== "Any"){

        filter = {
            fields: searchHiddenFields,   
            include:[
                        {
                            relation:'provided_languages',
                            scope:{
                                where:{ 'language_id': speaks },
                                fields:['language_id', 'user_id', 'ability'],
                                include:[{
                                    relation:'language',
                                    scope:{ fields: ['id','name','short_name'] },
                                    where:{'id': speaks}
                                }]                                    
                            }
                        },         
                        {
                            relation:'desired_languages',
                            scope:{
                                fields:['language_id', 'user_id', 'ability'],
                                include:[{
                                    relation:'language',
                                    scope:{fields: ['id','name','short_name']},
                                    where:{ 'id': learns }
                                }],
                                where:{ 'language_id': learns }
                            }
                        }
                    ],
                    where:{ and:[{gender:{like:gender}},{available:true}] }
        }        
    }
    
    else{
        filter = {
            fields: searchHiddenFields,   
            include:[
                        {
                            relation:'provided_languages',
                            scope:{
                                where:{ 'language_id': speaks },
                                fields:['language_id', 'user_id', 'ability'],
                                include:[{
                                    relation:'language',
                                    scope:{ fields: ['id','name','short_name'] },
                                    where:{'id': speaks}
                                }]                                    
                            }
                        },
                        {
                            relation:'desired_languages',
                            scope:{
                                fields:['language_id', 'user_id', 'ability'],
                                include:[{
                                    relation:'language',
                                    scope:{ fields: ['id','name','short_name'] },
                                    where:{ 'id': learns }
                                }],
                                where:{ 'language_id': learns }
                            }
                        }
                    ],
                    where:{ available:true }
        } 
    }

    Partner.find(filter, function(err, res) { 
        var searchResult=[];
        res.forEach(element => {
            element = element.toJSON();
            if( Object.keys(element.provided_languages).length &&  Object.keys(element.desired_languages).length ){
                searchResult.push(element);
            }
        });
        cb(null, searchResult);
    })
}

    // Hook, checks registered user before creating
    Partner.beforeRemote('create', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            // Denies access if trying to create cas_user or user_type
            if(ctx.req.body.user_type || ctx.req.body.cas_user){
                next(new Error('Action not allowed:inserting protected values.'));
            }
            // Checks user_id from cas_user
            var sql= "SELECT id from partner WHERE cas_user = ?";
            var cas_user = ctx.req.session.cas_user;
            var getUserId = getPromise(sql,cas_user, ctx);
            
            getUserId.then((result)=>{
                // If user doesn't exist, then add cas_user and create it
                if(!result.length){
                    ctx.req.body.cas_user = cas_user;
                    ctx.req.body.user_type = false;
                    next();

                }
            })
            .catch(err=>{
                next(new Error('Something went wrong'));
            })
        }else {
            next(new Error('Must be logged in'));
        }
    })


    // Hook, checks registered user before querying
    Partner.beforeRemote('find', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            // Checks user_id from cas_user
            var sql= "SELECT id from partner WHERE cas_user = ?";
            var cas_user = ctx.req.session.cas_user;
            var getUserId = getPromise(sql,cas_user, ctx);

            getUserId.then((result)=>{
                var user_id = result[0].id;
                // If user_id and idToUpdate are the same, then update
                if( user_id ){
                    next();
                }
            })
            .catch(err=>{
                next(new Error('Action not allowed.'));
            })
        }else {
            next(new Error('Must be logged in'));
        }
    })

    // Hook, checks data before updating user.
    Partner.beforeRemote('prototype.patchAttributes', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            // Denies access if trying to edit cas_user or user_type
            if(ctx.req.body.user_type || ctx.req.body.cas_user){
                next(new Error('Action not allowed.'));
            }
            // Checks user_id from cas_user
            var sql= "SELECT id from partner WHERE cas_user = ?";
            var cas_user = ctx.req.session.cas_user;
            var getUserId = getPromise(sql,cas_user, ctx);
            getUserId.then((result)=>{
                var user_id = result[0].id;
                var idToUpdate = ctx.req.params.id;
                // If user_id and idToUpdate are the same, then update
                if( user_id == idToUpdate ){
                    next();
                } 
            })
            .catch(err=>{
                next(new Error('Action not allowed.'));
            })
        }else {
            next(new Error('Must be logged in'));
        }
    })

}