'use strict';

const User = require('../model/user');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('cfgram:route-gallery');
const basicAuth = require('../lib/bearer-auth');
const bearerAuth = require('../lib/bearer-auth');

module.exports = function(router) {

  router.get('/api/gallery/:_id', bearerAuth, (req, res) => {
    debug('GET /api/gallery/:_id');

    return User.findById(req.params._id)
      .then(gallery => res.json(gallery))
      .catch(err => errorHandler(err, req, res));
  });
};
