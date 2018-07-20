'use strict';


module.exports = function(Partner) {

var provided_languages = Partner.relations[provided_languages];
var desired_languages = Partner.relations[desired_languages];



    // Custom Remote Method for getting CAS authenticated user

    Partner.remoteMethod('current', {
        accepts: {arg: 'cas_user', type: 'string', required: true},
        http: {path: '/current/:cas_user', verb: 'get'},
        returns: {type: 'array', root: true}
        
    });

    Partner.current = function(cas_user, cb) {
            Partner.findOne({where: {cas_user: cas_user},
                fields:{
                    email_conf_code:false,
                    email_confirmed:false,
                    avatar_content_type:false,
                    avatar_file_size: false,
                    avatar_updated_at: false,
                    created_at:false,
                    updated_at:false,
                    last_login:false
                    
            }}, function(err, res) { 
            cb(null, res);
        });    
        
      }

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
        if( gender !== "Any"){

            filter = {
                fields: {
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
                },   
                include:[
                            {
                                relation:'provided_languages',
                                scope:{
                                    where:{ 'language_id': speaks },
                                    limit: 1, skip: 0,
                                    fields:[
                                        'language_id',
                                        'user_id',
                                        'ability'
                                    ],
                                    include:[{
                                        relation:'language',
                                        scope:{
                                            fields: ['id','name','short_name']
                                        },
                                        where:{'id': speaks}
                                    }]                                    
                                }
                            },
                            
                            {
                                relation:'desired_languages',
                                scope:{
                                    limit: 1, skip: 0,
                                    fields:[
                                        'language_id',
                                        'user_id',
                                        'ability'
                                    ],
                                    include:[{
                                        relation:'language',
                                        scope:{
                                            fields: ['id','name','short_name']
                                        },
                                        where:{ 'id': learns }
                                    }],
                                    where:{ 'language_id': learns }
                                }
                            }
                        ],
                        where:{
                            and:[{gender:{like:gender}},{available:true}]
                            }
            }        
        }
        // else{
        //     filter = `{"where":{"available":true},"include":[{"relation":"provided_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${speaks}}]}}},{"relation":"desired_languages","scope":{"include":"language","where":{"and":[{"ability":{"gt":0}},{"language_id":${learns}}]}}}],"order":"updated_at%20ASC"}`
        // }
        Partner.find(filter, function(err, res) { 
            var myResult=[];
            res.forEach(element => {
                element = element.toJSON();
                if( Object.keys(element.provided_languages).length &&  Object.keys(element.desired_languages).length ){
                    myResult.push(element);
                    
                }
            });
            cb(null, myResult);
        })

    }

};