const env = process.env.DEPLOYENV || 'local';
const config = require('../../resources/config');

module.exports = config[env];
