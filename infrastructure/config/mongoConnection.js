const mongoose = require('mongoose');
const mongoConfig = require('./applicationConfig').mongo;

const uri = `mongodb://${mongoConfig.user}:${mongoConfig.pass}@${mongoConfig.host}:27017/${mongoConfig.db}`

const mongoClient = mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true });

module.exports = mongoClient;
