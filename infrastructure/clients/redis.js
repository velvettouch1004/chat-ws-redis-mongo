const redisClients = require('../config/redisConnection');

const subscribe = (socket, topic) => {

    redisClients.redisSub.subscribe(topic);
    redisClients.redisSub.on('message', (channel, message) => {
        if(channel === topic) socket.send(message);
    });
};

const publish = async (topic, data) => {
    let result;
    try {
        result = await redisClients.redisPub.publish(topic, data)
    } catch (e) {
        console.error(`Error al publicar el mensaje ${data} en el topico ${topic} en redis: ${e}`);
    }
    return result;
};

module.exports = {
    publish: publish,
    subscribe: subscribe
};
