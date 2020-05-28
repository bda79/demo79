const config = require('./middleware/env');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();

console.log("env", process.env);

require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();


const port = config().port;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;