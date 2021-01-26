const redisOps = require('../../infrastructure/clients/redis');
const chatRepository = require('../repository/chat');

const onConnection = (data) => {
    let { connection, user, clients } = data

    console.debug(`Se conectó un socket con id: ${clients.indexOf(connection)}`);
    redisOps.subscribe(connection.socket, user);
}

const onMessage = async (message) => {

    console.debug('Se realiza la acción cuando llega un mensaje al socket');

    const { user, meet, data } = message;
    let messageProcessed = {
        status: false,
        body: data,
        meet_id: meet,
        send_to: user
    };
    
    let chatFormatted = {
        meet_id: meet,
        user_id: user,
        body: data
    }

    try {
        const savedChat = await chatRepository.saveChat(chatFormatted);
        if(savedChat) {
            messageProcessed.status = await redisOps.publish(user, data);
        }
    } catch (e) {
        console.error(`Error no controlador: ${e}`);
        messageProcessed.status = false;
    }

    return messageProcessed;
}

module.exports = {
    onConnection,
    onMessage
};
