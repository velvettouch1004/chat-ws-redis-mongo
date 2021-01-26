const chatModel = require('./models/chatModel');

const saveChat = chat => {
    return chatModel.create(chat);
}

module.exports = {
    saveChat: saveChat
}
