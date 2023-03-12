const { Router } = require("express");
const ChatManager = require("../dao/managers/chatManager");
const router = Router();
//const messagesModel = require("../dao/models/chats.models");
const chatManager = new ChatManager();

router.get(`/`, async (req, res) => {
      try {
        let messages = await chatManager.getAllMessages()
    
        //++++++++++ AGREGAR VALIDACIONES +++++++++++++++/////
        return res.json({
          message: "mensajes obtenidos satisfactoriamente",
          messages,
        });
      } catch (error) {
        console.log("🚀 ~ file: chat.routes.js:28 ~ router.get ~ error:", error);
      }
    });

router.post("/", async (req, res) => {
  try {
    //++++++HACER VALIDACIONES y manejar errores++++++++
    const messageBody = req.body;
    console.log("🚀 ~ file: chat.routes.js:25 ~ router.post ~ messageBody:", messageBody)
    const newMessage = await chatManager.addMessage(messageBody);

    return res.json({
      messageStatus: `message added succesfully`,
      message: newMessage,
    });
  } catch (error) {
    console.log("🚀 ~ file: chat.routes.js:43 ~ router.post ~ error:", error);
  }
});

module.exports = router;
