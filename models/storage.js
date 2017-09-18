'use strict';


const debug = require('debug')('piSpy:storage');
const mongoose = require('mongoose');

// Create Storage Schema? Do we need this or are we using S3 for this?
// Similar to gallery example?
// name, id, timestamp.
const Storage = mongoose.Schema({
  name : {type : String, required : true},
  // Make Storage aware of user it belongs to.
  userId : { type : mongoose.Schema.Types.ObjectId, required : true, ref: 'user'}
}, {timestamps : true});

//Export

module.exports = mongoose.model('storage', Storage);
