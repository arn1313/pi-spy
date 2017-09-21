'use strict';

const debug = require('debug')('piSpy:error-handler');
module.exports = function(err, req, res) {
  debug(`#error-handler: ${ err.message }`);
  let msg = err.message.toLowerCase();
  switch(true) {
  case msg.includes('form-data failed'): return res.status(400).send(`${ err.name }: ${ err.message }`);
  case msg.includes('authorization failed'): return res.status(401).send(`${ err.name }: ${ err.message}`);
  case msg.includes('validation failed'): return res.status(400).send(`${ err.name }: ${ err.message}`);
  case msg.includes('duplicate key'): return res.status(409).send(`${ err.name }: ${ err.message }`);
  case msg.includes('objectid failed'): return res.status(404).send(`${ err.name }: ${ err.message }`);
  case msg.includes('wat'): return res.status(418).send(`I'm a teapot: ${ err.message }`);
  default: return res.status(500).send(`${err.name}: ${ err.message }`);
  }
};
