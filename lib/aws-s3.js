'use strict';

const debug = require('debug')(piSpy:aws-s3);

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
s3.config.setPromisesDependency(require('bluebird'));

module.exports = function(params) {
  debug('#s3Upload');

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3Data) => {
      if(err) reject(err);
      resolve(s3Data);
    });
  });
};
