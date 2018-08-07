'use strict';

module.exports = function(Contact) {

    var getPromise=function(sqlString, param){
        var promise = new Promise((resolve, reject) => { 
            var ds = Contact.dataSource;
            var sql = sqlString;
            ds.connector.query(sql, [param], function (err, result ) {
                if (err)reject(err);
                resolve( result );
            });
        });
        return promise;
    }


// Hook, adds sender_id before creating a new message
    Contact.beforeRemote('create', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            var param = ctx.req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPromise(sql, param, ctx);
            getUserId.then((result)=>{
                var id = result[0].id;
                ctx.req.body['sender_id']=id;
                next();
            });                
        } else {
          next(new Error('Must be logged in'))
        }
      });

    // Function for getting Received messages
    Contact.remoteMethod('getReceivedMessages',{
        accepts:[
            {arg: "req", type: "object", http: {source: "req"}}
        ],
        http: {
            path:'/received',
            verb: 'get'
        },
        returns:{
            arg:'Inbox',
            type:'array',
            root: true
        }
    });

  
    Contact.getReceivedMessages = function(req, cb) {
        var sql ="select id from partner where cas_user = ?";
        var param = req.session.cas_user;
        var getUserId = getPromise(sql, param, req);
    
        getUserId.then((result) => {
            var param = result[0].id;
            var sql =`
                select c.id, c.sender_id, c.recipient_id, c.subject,
                c.content, c.viewed,c.created_at, p.user_name as recipient,
                (select user_name from partner where partner.id=sender_id) as sender
                from contacts c
                join partner p
                on c.recipient_id = p.id
                where c.recipient_id =  ?`;
            var receivedMessages = getPromise(sql, param, req);
            receivedMessages.then((receivedMessages)=>{
                cb(null,receivedMessages);
            }
            )
        })
    }


// Function for getting Sent messages
        Contact.remoteMethod('getSentMessages',{
            accepts:[
                {arg: "req", type: "object", http: {source: "req"}}
            ],
            http: {
                path:'/sent',
                verb: 'get'
            },
            returns:{
                arg:'Sent',
                type:'array',
                root: true
            }
        });

        Contact.getSentMessages = function(req, cb) {
            var param = req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPromise(sql, param, req);
        
            getUserId.then((result) => {
                var param = result[0].id;
                var sql =`
                select c.id, c.sender_id, c.recipient_id, c.subject,
                c.content, c.viewed,c.created_at, p.user_name as recipient,
                (select user_name from partner where partner.id=sender_id) as sender
                from contacts c
                join partner p
                on c.recipient_id = p.id
                where c.sender_id =  ?`;
                var sentMessages = getPromise(sql, param, req);
                sentMessages.then((sentMessages)=>{
                    cb(null,sentMessages);
                }
                )
            })
        }


}