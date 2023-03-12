const messagesModel = require("../models/chats.models");

class ChatManager {
  getAllMessages = async () => {
    try {
      const messages = await messagesModel.find({});
      return messages;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.js:9 ~ ChatManager ~ getAllMessages= ~ error:",
        error
      );
    }
  };

  addMessage = async (data) => {
    try {
      const newMessage = await messagesModel.create(data);
      return newMessage;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.js:20 ~ ChatManager ~ addMessage= ~ error:",
        error
      );
    }
  };
}

module.exports = ChatManager;
