'use strict';
var formidable = require('formidable');
var app = require("../../server/server");
const { extname } = require('path');
const { readFileSync } = require('fs');
const AWS = require('aws-sdk');

// Amazon IAM user credentials.
var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
var secretAccessKey = process.env.AWS_ACCESS_KEY;

AWS.config.update({
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey,
    region:process.env.AWS_REGION
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
        const fileName = result.Location;
        const fileType = file.type;

        // Update user. Save avatar data into the DB 
        const data = await updateUserAvatarData(fileName, fileType, user_id);

        // return the updated frog instance
        return data;
    };

    // Helper method which takes the request object and returns a promise with a file.
    const getFileFromRequest = (req) => new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.maxFileSize = 1 * 1024 * 1024;
        form.maxFields = 1;
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          const file = files.image; // get the file from the returned files object
          if (!file) reject('File was not found in form data.');
          const fileType = file.type;
          if(fileType == 'image/jpg' || fileType == 'image/png' || fileType == 'image/jpeg' ){
            resolve(file);
          }else{
            reject('File format is not supported.');
          }
        });
      });
      
    // Helper method which updates users avatar information  
    const updateUserAvatarData = (fileName, fileType, user_id) => new Promise((resolve, reject) => {
        var Partner = app.models.Partner;
        var params = [fileName, fileType, user_id]
        var sql ="update partner set avatar_file_name = ?, avatar_content_type = ? where id = ?";
        var ds = Partner.dataSource;
        ds.connector.query(sql, params, function (err, result) {
            if (err) reject('There was an error uploading the file');
            else resolve (result);
        });
      });

    // Helper method which takes the request object and returns a promise with the AWS S3 object details.
    const uploadFileToS3 = (file, user_id, options = {}) => {
        // turn the file into a buffer for uploading
        const buffer = readFileSync(file.path);
        const extension = extname(file.name);
        const fileName = "avatar" + extension;
        // return a promise
        return new Promise((resolve, reject) => {
          return s3.upload({
              Bucket: process.env.AWS_BUCKET,
              ACL: 'public-read',
              Key: `${user_id}/${user_id}-${fileName}`,
              Body: buffer,
          }, (err, result) => {
              if (err) reject(err);
              else resolve(result); // return the values of the successful AWS S3 request
          });
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