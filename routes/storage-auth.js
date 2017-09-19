'use strict';
const Storage = require('../models/storage');
const jsonParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('piSpy:storage-auth');
const bearerAuth = require('../lib/bearer-auth');

module.exports = function(router) {
  router.post('/api/storage', bearerAuth, jsonParser, (req, res) => {
    debug('POST /api/storage');

    req.body.userId = req.user._id;

    return new Storage(req.body).save()
      .then(storage => res.json(storage))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/storage/:_id', bearerAuth, (req, res) => {
    debug('GET /api/storage/:_id');

    return Storage.findById(req.params._id)
      .then(storage => res.json(storage))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/storage', bearerAuth, (req, res) => {
    debug('GET /api/storage');

    return Storage.find()
      .then(storages => res.json(storages.map(stor => stor._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/storage/:_id', bearerAuth, (req, res) => {
    debug('DELETE /api/storage/:_id');

    return Storage.findById(req.params._id)
      .then(storage => {
        if(storage.userId.toString() === req.user._id.toSting()) return storage.remove();
        errorHandler(new Error('authorization failed; user does not have storage'), req, res);
      })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
