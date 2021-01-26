// TODO: secure Redis client creating user/pass auth
const redis = require('redis');
const redisHost = require('./applicationConfig').redisHost;

const redisClients =  {
    redisPub: redis.createClient({ host: redisHost }),
    redisSub: redis.createClient({ host: redisHost })
};

module.exports = redisClients;
