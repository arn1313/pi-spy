'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  findHash: { type: String, unique: true },
});

User.methods.generatePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

User.method.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(new Error('authorization failed, password did not match'));
      resolve(this);
    });
  });
};

User.method.generateFindHash = function() {
  return new Promise((resolve, reject) => {
    let _generateFindHash = () => {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => resolve(this.findHash))
        .catch(err => {
          if (tries > 3) return reject(new Error('authorization failed, findHash failed'));
          tries++;
          _generateFindHash();
          //pick up here
        });
    };

    _generateFindHash();
  });
};

User.methods.generateToken = function() {

  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then(findHash => resolve(jwt.sign({ token: findHash }, process.env.APP_SECRET)))
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = mongoose.model('user', User);
// User Schema Creation.
// id, username, name, password, email.
// name and username same thing?


//Connect User Schema to Storage.

//Export to MongoDB.
