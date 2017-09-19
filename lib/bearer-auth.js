'use strict';

const debug = require('debug')('piSpy:bearer-auth');
const errorHandler = require('./error-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  debug('#bearerAuth');

  let authHeaders = req.headers.authorization;
  if(!authHeaders) return errorHandler(new Error('authorization failed; auth headers required'), req, res);

  let token = authHeaders.split('Bearer ')[1];
  if(!token) return errorHandler(new Error('authorization failed; token required'), req, res);

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err) {
      err.message = 'authorization failed; token not verified';
      return errorHandler(err, req, res);
    }

    User.findOne({ findHash: decoded.token })
      .then(user => {
        delete user.password;
        req.user = user;
        next();
      })
      .catch(err => errorHandler(err, req, res));
  });
};
