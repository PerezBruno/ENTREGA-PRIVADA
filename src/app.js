const express = require("express");

const path = require("path");

const ProductManager = require("./dao/managers/ProductManager");

const { Server } = require("socket.io");

const displayRoutes = require("express-routemap");

const mongoose = require("mongoose");

const productRoutes = require("./routes/product.routes");

const cartsRoutes = require("./routes/carts.routes");

const chatRoutes = require("./routes/chat.routes");

const handlebars = require("express-handlebars");
const { DB_HOST, DB_PORT, DB_NAME, DB_CNN, PORT, DB_PASSWORD, DB_USER } = require("./config/config");

const ChatManager = require("./dao/managers/chatManager");

const productManager = new ProductManager("./products/productos.json");
const chatManager = new ChatManager();

const BASE_PREFIX = "api";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${BASE_PREFIX}/products`, productRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartsRoutes);
app.use(`/${BASE_PREFIX}/chat`, chatRoutes);



//configuración de handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

let listaProducts = [];
const cargarProd = async () => {
  try {
    listaProducts = await productManager.getProducts();
  } catch (error) {
    console.error("Error: not product found");
  }
};
cargarProd();

//rutas socket
app.get("/realtimeproducts", async (req, res) =>
  res.status(200).render("realTimeProducts")
);

app.get("/", async (req, res) => {
  res.status(200).render("home", { products: listaProducts });
});

app.get("/chat", async (req, res) => {
  res.status(200).render("chat");
});

// configurando Socket.io

const server = app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Escuchando en puerto ${PORT}`);
});

const io = new Server(server);


io.on("connection", async (socket) => {
  console.log("conectado");

  socket.emit("products", listaProducts);

  socket.on("addProd", async (prod) => await productManager.addProducts(prod));

  socket.on(
    "delProd",
    async (id) => (await productManager.deleteProduct(id)) && console.log(id)
  );

  //****canal de mensajes
  socket.on("message", async (data) => {
    console.log("🚀 ~ file: app.js:111 ~ socket.on ~ data: TESTEANDO ", data);
    try {
      await chatManager.addMessage(data);
    } catch (error) {
      console.log("🚀 ~ file: app.js:105 ~ socket.on ~ error:", error) 
    }
    const info = await chatManager.getAllMessages();
    io.emit("messageLogs", info);
  });


  //****canal de autenticación
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
  });

  //canal de autenticación
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConected", data);
  });
});

// ****** Configuración de mongoose *****
//const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const connection = mongoose;
const uriCluster = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@backcoder.ww53yeq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
// connection
//   .connect(uri)
//   .then((conn) => {
//     console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
//   })
//   .catch((err) => {
//     console.log("🚀 ~ file: app.js:20 ~ err:", err);
//   });


// conección para mongo Atlas
const enviroment = async () =>{
  mongoose.set('strictQuery', true)
  try{
    await mongoose.connect(uriCluster)
    console.log("conectado a Mongo Atlas")
  }catch(error){
  console.log("🚀 ~ file: app.js:138 ~ enviroment ~ error:", error)

  }
}
enviroment()