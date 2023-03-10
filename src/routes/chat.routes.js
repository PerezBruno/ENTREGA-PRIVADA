const { Router } = require("express");
const router = Router();
const chatsModel = require("../models/chats.models")

class ChatRoutes {
  path = "/chat";
  router = Router();

  constructor() {
    this.initChatsRoutes();
  }

  initChatsRoutes() {
    this.router.get(`${this.path}`, async (req, res) => {});
  }
}

router.get("/", async (req, res) => {
  try {
    const messages = await chatsModel.find();

    //++++++++++ AGREGAR VALIDACIONES +++++++++++++++/////

    return res.json({
      message: "mensajes obtenidos satisfactoriamente",
      messages,
    });
  } catch (error) {
  console.log("🚀 ~ file: chat.routes.js:28 ~ router.get ~ error:", error)
  }
});

router.post("/", async (req, res) => {
  try {
    //++++++HACER VALIDACIONES y manejar errores++++++++
    const messageBody = req.body;
    const newMessage = await chatsModel.create(messageBody);

    return res.json({
      message: `message added succesfully`,
      message: newMessage,
    });
  } catch (error) {
  console.log("🚀 ~ file: chat.routes.js:43 ~ router.post ~ error:", error)

  }
});

module.exports = router;
