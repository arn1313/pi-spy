'use strict';

const debug = require('debug')('piSpy-server');

//express set up
const express = require('express');
const app = express();
const router = express.Router();

// mongoose set up
const mongoose = require('mongoose');

//Promisified Mongoose
mongoose.Promise = require('bluebird');

// Starting MongoDB connection using our .env variables.
let mongoConnection = mongoose.connect(process.env.MONGODB_URI, { useMongoClient : true});

// mounting routes into router.
// figure out routes!
// apparently endpoints are /signup, /signin, /storage, /storage/videos?
// example.
// require('../folder/file')(router);
require('../routes/storage-auth')(router);

// mount middleware to app

app.use(require('cors')());
app.use(router);

//set routes here.


// set catch all for improper routes
app.all('/*', (req, res) => { res.sendStatus(404);});

// explicit server on and off, courtesy of Scott
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
