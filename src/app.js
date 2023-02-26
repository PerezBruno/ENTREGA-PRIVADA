const express = require("express");

const path = require ("path")

const ProductManager = require("./ProductManager")

const { Server } = require("socket.io")


const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")

const handlebars = require("express-handlebars")

const productManager = new ProductManager("./products/productos.json");


const BASE_PREFIX = "api";


const PORT = 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(`/${BASE_PREFIX}/products` , productRoutes);
app.use(`/${BASE_PREFIX}/carts` , cartsRoutes);

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
//rutas
app.get("/realtimeproducts", async (req, res) =>
  res.status(200).render("realTimeProducts")
);

app.get("/", async (req, res) => {
  res.status(200).render("home", { products: listaProducts });
});

// configurando Socket.io

const server = app.listen(PORT, ()=>{
  console.log(`Escuchando en puerto ${PORT}`)
})

const io = new Server(server);


io.on("connection", (socket) => {
//  console.log("🚀 ~ file: app.js:73 ~ io.on ~ socket:", socket)
  console.log("conectado")
  	
	})



//***********************LLEGUE AL MINUTO 28 DEL VIDEO 3 ***********************/






//Configurar e instalar handlebars - listo


// Configurar e instalar socket


//Crear vista home.handlebars debe mostrar todos los productos agregados hasta el momento


//Crear la vista realTimeProducts.handlebars con el endpoint "/realtimeproducts" en nuestro views router
//Debe contener la misma lista de productod pero debe trabajar con websocket
//Cada vez que se actualice la lista de productos se debe actualizar la vista automáticamente

//Para manipular las listas de productos, crear una vista simple de un formulario en la vista realTimeProducts.handlebars

//Si se desea hacer la conexion de socket emits con HTTP, deberas buscar la forma de utilizar el servidor "io" de sockets dentro de la petición POST