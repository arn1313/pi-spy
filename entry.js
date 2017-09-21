'use strict';

require('dotenv').config();
require('./lib/server').start();
require('./quickstart.js');
require('./drive-middleware/commands');
