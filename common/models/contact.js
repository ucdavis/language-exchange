'use strict';

module.exports = function(Contact) {

    // Function for getting Received messages
    Contact.remoteMethod('getReceivedMessages',{
        accepts:{
            arg:'recipient_id',
            type:'number',
            required: true
        },
        http: {
            path:'/messages/:recipient_id',
            verb: 'get'
        },
        returns:{
            arg:'Inbox',
            type:'array',
            root: true
        }
    });

    Contact.getReceivedMessages = function(recipient_id, cb) {
        Contact.find({
            where: {recipient_id: recipient_id},                
            fields:{ updated_at: false }
        }, function(err, result) { 
        cb(null, result);
    });    
  }


};