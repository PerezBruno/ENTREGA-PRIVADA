const { Router } = require("express");
const router = Router();

// class ChatRoutes {
//     path = "/chat";
//     router = Router();

//     constructor(){
//         this.initChatsRoutes();
//       }

//       initChatsRoutes(){
//         this.router.get(`${this.path}`, async (req, res)=>{

//         })
//       }
// }

router.get("/", async (req, res) => {
  //     try {
  //         const result = await chatModel.find();
  //     } catch (error) {
  //         console.log("🚀 ~ file: chat.routes.js:23 ~ router.get ~ error:", error)
  //     }
});

router.post("/", async (req, res) => {
  //     try {
  //         const result = await chatModel.find();
  //     } catch (error) {
  //         console.log("🚀 ~ file: chat.routes.js:23 ~ router.get ~ error:", error)
  //     }
});

module.exports = router;
