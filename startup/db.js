const logger = require('../middleware/logger');
const mongoose = require('mongoose');
const config = require('../middleware/env');

module.exports = function() {

    const uri = config().db; //'mongodb://localhost:27017/vidly'

    mongoose.connect(uri, { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true, 
        useUnifiedTopology: true

    })
    .then(() => logger.info(`Connected to ${uri}...`));
}