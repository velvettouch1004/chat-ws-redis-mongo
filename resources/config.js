module.exports = {
    development: {
        port: process.env.SERVER_PORT,
        protocolHeader: process.env.PROTOCOL_HEADER,
        redisHost: process.env.REDIS_HOST,
        'mongo': {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            host: process.env.MONGO_HOST,
            db: process.env.MONGO_DB
        }
    },
    local: {
        port: 3000,
        protocolHeader: 'sec-websocket-protocol',
        redisHost: 'localhost',
        'mongo': {
            user: 'root',
            pass: 'example',
            host: 'localhost',
            db: 'admin'
        }
    }
};
