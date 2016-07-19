require('dotenv').config();
var AWS = require('aws-sdk');
var Papa = require('babyparse');
var jsonData = require('./jsonData.js');
var fs = require('fs');

var csv = Papa.unparse(JSON.stringify(jsonData.data));

var s3 = new AWS.S3({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});
var params = {Bucket: process.env.BUCKET_NAME, Key: 'test-csv', Body: csv};
var getParams = {Bucket: process.env.BUCKET_NAME, Key: 'test-csv'};

// s3.getObject(getParams, function(err, data) {
  // var wstream = fs.createWriteStream('./test-csv.csv');
  // wstream.write(data.Body);
// });

s3.upload(params, {}, function(err, data) {
  console.log(err, data);
});
