const mongoose = require("mongoose");

const chatsCollection = 'Messages'

const messagesSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const messagesModel = mongoose.model(chatsCollection, messagesSchema);

module.exports = messagesModel;