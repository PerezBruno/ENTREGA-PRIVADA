const express = require("express");

const path = require ("path")

const ProductManager = require("./dao/managers/ProductManager")

const { Server } = require("socket.io")

const displayRoutes = require("express-routemap");

//const corsConfig = require("./config/cors.config");

const mongoose = require("mongoose")
//const { connect } = require("mongoose");

const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")

const chatRoutes = require("./routes/chat.routes")


const handlebars = require("express-handlebars");
const { DB_HOST, DB_PORT, DB_NAME, DB_CNN, PORT } = require("./config/config");

const productManager = new ProductManager("./products/productos.json");


const BASE_PREFIX = "api";

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;


//const PORT = 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(`/${BASE_PREFIX}/products` , productRoutes);
app.use(`/${BASE_PREFIX}/carts` , cartsRoutes);
app.use(`/${BASE_PREFIX}/chat`, chatRoutes);





//configuración de handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'))



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

app.get("/chat", async (req, res)=>{
  res.status(200).render("chat")
})

// configurando Socket.io

const server = app.listen(PORT, ()=>{
  displayRoutes(app)
  console.log(`Escuchando en puerto ${PORT}`)
})

const io = new Server(server);

const messages = [];

io.on("connection", async (socket) => {
//  console.log("🚀 ~ file: app.js:73 ~ io.on ~ socket:", socket)
  console.log("conectado")

 // const products = await productManager.getProducts();
	socket.emit('products', listaProducts);

	socket.on('addProd', async prod => await productManager.addProducts(prod));

	socket.on('delProd', async id => await productManager.deleteProduct(id) && console.log(id));

      //****canal de mensajes
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  })

      //****canal de autenticación
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data)
    }
  )

    //canal de autenticación
    socket.on("authenticated", (data) => {
      socket.broadcast.emit("newUserConected", data)
      
    })
  	
	})




  // ****** Configuración de mongoose *****
  const connection = mongoose;

  connection.connect(uri)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:20 ~ err:", err);
  });
