'use strict';

const auth = require('./google-auth');


const baseUrl = 'https://www.googleapis.com/drive/v3/';

module.exports = function(url, opts/* = {}*/) {
  if(opts === undefined) opts = {};
  return auth()
    .then(request => new Promise((resolve, reject) => {
      request.get(baseUrl + url, opts, function(err, res) {
        err ? reject(err) : resolve(res);
      });
    }))
    .then(res => {
      if(res.statusCode >= 300) throw new Error('Bad status: ' + res.statusCode);
      return JSON.parse(res.body);
    });
};
