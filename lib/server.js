'use strict';

const debug = require('debug')('piSpy-server');

//express set up
const express = require('express');
const app = express();
const router = express.Router();

// mongoose set up
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let mongoConnection = mongoose.connect(process.env.MONGODB_URI, { useMongoClient : true});

app.use(require('cors')());
app.use(router);
require('../routes/user-auth')(router);

app.all('/*', (req, res) => { res.sendStatus(404);});

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        debug(`Listening on ${process.env.PORT}`);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        mongoConnection.close();
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('the server is not running'));
  });
};
