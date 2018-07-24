'use strict';
const sqlite3 = require('sqlite3').verbose();
var async = require("async");


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
            console.log("Before remote:",ctx.req.session.cas_user)
            var param = ctx.req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPromise(sql, param, ctx);
            getUserId.then((result)=>{
                console.log("result:",result)
                var id = result[0].id;
                ctx.req.body['sender_id']=id;
                console.log(ctx.req.body)
                next();
            });
        
           
        } else {
          next(new Error('must be logged in to update'))
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

//     var getUserId=function(cas_user){
//         var ds = Contact.dataSource;
//         var sqlUser ="select id from partner where cas_user = ?";
//         var user_id = ds.connector.query(sqlUser, [cas_user], function (err, user_id ) {
//             if (err) console.error(err);
//             return user_id;
//         });
//         console.log(user_id);
//         return user_id;
//     }

//    var getInbox=function(recipient_id){
//         var ds = Contact.dataSource;
//         var sql ="select sender_id, recipient_id, subject, content, read, created_at, id from contacts where recipient_id = ?";
//         ds.connector.query(sql, [recipient_id], function (err, receivedMessages ) {
//             if (err) console.error(err);
//             return receivedMessages;
//             // cb(err, receivedMessages);
//         });
//     }




    
    Contact.getReceivedMessages = function(req, cb) {
        var sql ="select id from partner where cas_user = ?";
        var param = req.session.cas_user;
        var getUserId = getPromise(sql, param, req);
    
        getUserId.then((result) => {
            var param = result[0].id;
            var sql =`
                select c.id, c.sender_id, c.recipient_id, c.subject,
                c.content, c.read,c.created_at, p.user_name as recipient,
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
                c.content, c.read,c.created_at, p.user_name as recipient,
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