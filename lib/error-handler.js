'use strict';

module.exports = function(err, req, res) {
  let msg = err.message.toLowerCase();
  switch(true) {
  case msg.includes('wat'): return res.status(418).send(`I'm a teapot: ${ err.message }`);
  default: return res.status(500).send(`${err.name}: ${ err.message }`);
  }
};
