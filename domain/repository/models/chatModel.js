const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    meet_id: {
        type: String
    },
    user_id: {
        type: String
    },
    body: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chat', chatSchema);
