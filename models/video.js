'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const Storage = require('./storage');
const mongoose = require('mongoose');
const tempDir = `${__dirname}/../temp`
const s3UploadProm = require('../lib/aws-s3');

const Video = mongoose.Schema({
  name: { type: String, required: true },
  storageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  videoURI: { type: String, required: true, unique: true },
  objectKey: { type: String, required: true, unique: true },
}, {timestamps: true });

Video.statics.upload = function(req) {
  return new Promise((resolve, reject) => {
    if(!req.file) return reject(new Error('form-data failed: file not present'));
    if(!req.file.filename) return reject(new Error('form-data failed: file path not found'));

    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path);
    }

    return s3UploadProm(params)
    .then(s3Data => {
      del([`${tempDir}/*`]);

      let videoData = {
        name: req.body.name,
        desc: req.body.desc,
        objectKey: s3Data.Key,
        videoURI: s3Data.Location,
        userId: req.user._id,
        galleryId: req.body.galleryId,
      }
      resolve(videoData);
    });
    .catch(reject);
  });
};

module.exports = mongoose.model('video', Video);

//Create Video Schema.
// id, timestamp.

//Make Video Schema aware of Storage Schema.

//Export to MongoDB.
