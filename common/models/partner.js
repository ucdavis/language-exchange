'use strict';

module.exports = function(Partner) {

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
                    email:false,
                    avatar_content_type:false,
                    avatar_file_size: false,
                    avatar_updated_at: false,
                    

            }}, function(err, res) { 
            cb(null, res);
        });    
        
      }


};