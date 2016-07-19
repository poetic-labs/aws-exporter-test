require('dotenv').config();
var AWS = require('aws-sdk');
var jsonData = require('./jsonData.js');
var fs = require('fs');
var json2csv = require('json2csv');

try {
  var csv = json2csv({ data: jsonData.data });
} catch (err) {
  console.error(err);
}

var s3 = new AWS.S3({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});
var params = {Bucket: process.env.BUCKET_NAME, Key: 'test-csv-2', Body: csv};
var getParams = {Bucket: process.env.BUCKET_NAME, Key: 'test-csv-2'};

s3.getObject(getParams, function(err, data) {
  var wstream = fs.createWriteStream('./test-csv-2.csv');
  wstream.write(data.Body);
});

// s3.upload(params, {}, function(err, data) {
  // console.log(err, data);
// });
