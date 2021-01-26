const verifyClient = require('./domain/helpers/verifyClient');
const chatService = require('./domain/service/chat');
const serverPort = require('./infrastructure/config/applicationConfig').port;
const mongoClient = require('./infrastructure/config/mongoConnection');
const authService = require('./infrastructure/clients/http');

initServer();

const fastify = require('fastify')()
    fastify.register(require('fastify-websocket'), {
        handle,
        options: {
            path: '/chat',
            verifyClient: verifyClient
        }
});

const clients = [];

async function handle(connection) {

    clients.push(connection);
    const client = await authService.getAuthUser(connection.socket.protocol);

    let data = {
        connection: connection,
        user: client.id,
        clients
    };

    chatService.onConnection(data);

    connection.socket.on('message', async message => {
        const json = JSON.parse(message);
        const reply = await chatService.onMessage(json);
        connection.socket.send(JSON.stringify(reply));
    });

    connection.socket.on('error', e => {
        console.error(`Error al no realizar al conexión del socket: ${e}`);
    });

    connection.socket.on('close', async status => {
        console.debug(`Socket desconectado con status: ${status}`);
        clients.slice(clients.indexOf(connection), 1);
    });
};

async function initServer() {
    await mongoClient.catch(e => console.error('Error al conectarse con mongo. Error: ' + e));
    fastify.listen(serverPort)
        .catch(e => {
            console.error(`No fue posible subir el servidor ws: ${e}`);
            process.exit(1);
        })
};
