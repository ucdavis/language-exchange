'use strict';
var formidable = require('formidable');
var app = require("../../server/server");
const { extname } = require('path');
const { readFileSync } = require('fs');
const AWS = require('aws-sdk');

var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
var secretAccessKey = process.env.AWS_ACCESS_KEY;

AWS.config.update({
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey,
    region:"us-west-2"
  });

var s3 = new AWS.S3();

module.exports = function(Storage) {
    
    var getPartner=function(sqlString, param){
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
    

    // Remote method for uploading image
    Storage.remoteMethod('uploadAvatarImage', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } }, // pass the request object to remote method
        ],
        returns: { root: true, type: 'object' },
        http: { path: '/upload-avatar', verb: 'post' },
        });

    Storage.uploadAvatarImage = async (req) => { 
        // extract the file from the request object
        const file = await getFileFromRequest(req);
        const user_id = req.body.user_id;

        
        // upload the file
        const result = await uploadFileToS3(file, user_id );
        
        // Update user. Save avatar data into the DB 

        const data = await updateUserAvatarData(result, user_id);
        // await frog.updateAttributes({
        // link: Location,
        // etag: ETag,
        // bucket: Bucket,
        // image: Key,
        // });
        
        // return the updated frog instance
        return data;
    };

    // Helper method which takes the request object and returns a promise with a file.
    const getFileFromRequest = (req) => new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          const file = files.image; // get the file from the returned files object
          if (!file) reject('File was not found in form data.');
          else resolve(file);
        });
      });
      

    // Helper method which updates users avatar information  
    const updateUserAvatarData = (avatarUserData, user_id) => new Promise((resolve, reject) => {
        var Partner = app.models.Partner;
        var params = [avatarUserData.Key, user_id]
        var sql ="update partner set avatar_file_name =? where id = ?";
        var ds = Partner.dataSource;
        ds.connector.query(sql, params, function (err, result ) {
            if (err)console.log(err);
            else resolve (result);
            console.log("result",result);
        });
        console.log("avatarUserData",avatarUserData);
      });

      /**
     * Helper method which takes the request object and returns a promise with the AWS S3 object details.
     */
    const uploadFileToS3 = (file, user_id, options = {}) => {

        // turn the file into a buffer for uploading
        const buffer = readFileSync(file.path);
        
        const fileName = file.name;
        const extension = extname(file.path);
        
        // return a promise
        return new Promise((resolve, reject) => {
        return s3.upload({
            Bucket: 'tle-dev',
            ACL: 'public-read',
            Key: `${user_id}/${fileName}${extension}`,
            Body: buffer,
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result); // return the values of the successful AWS S3 request
        });
        });
    };

    // Remote Method for downloading images
    Storage.remoteMethod('downloadAvatar', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'id', type: 'number', required:true }, 
            { arg:'file_name', type:'string', required:true },
        ],
        returns: [
      {arg: 'Content-Type', type: 'image/jpeg', http: { target: 'header' }}
    ],
        http: { path: '/download/:id/:file_name', verb: 'get' },
        });

    Storage.downloadAvatar = async (req, id, file_name) => { 
        var params = {
            Bucket: "tle-dev", 
            MaxKeys: 2
           };
        s3.listObjects(params, function(err, data) {
            if (err) {
                console.log(err, err.stack)
            }
            console.log(data); 
            // var href = this.request.httpRequest.endpoint.href;
        //     var bucketUrl = "tle-dev/"
        //      var photoUrl = bucketUrl + encodeURIComponent(file_name);
        //     return photoUrl;
          });
    };


 // Hook, checks owner before upload file
    Storage.beforeRemote('uploadAvatarImage', function(ctx, unused, next) {
        if(ctx.req.session.cas_user) {
            var param = ctx.req.session.cas_user;
            var sql ="select id from partner where cas_user = ?";
            var getUserId = getPartner(sql, param, ctx);
            getUserId.then((result)=>{
                var id = result[0].id;
                ctx.req.body['user_id']=id;
                next();
            });                
        } else {
          next(new Error('Must be logged in'))
        }
    });

};