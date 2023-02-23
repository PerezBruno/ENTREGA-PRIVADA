const express = require("express");

const path = require ("path")

const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")

const handlebars = require("express-handlebars")


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


  app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
  });
  

//Configurar e instalar handlebars - listo


// Configurar e instalar socket


//Crear vista home.handlebars debe mostrar todos los productos agregados hasta el momento


//Crear la vista realTimeProducts.handlebars con el endpoint "/realtimeproducts" en nuestro views router
//Debe contener la misma lista de productod pero debe trabajar con websocket
//Cada vez que se actualice la lista de productos se debe actualizar la vista automáticamente

//Para manipular las listas de productos, crear una vista simple de un formulario en la vista realTimeProducts.handlebars

//Si se desea hacer la conexion de socket emits con HTTP, deberas buscar la forma de utilizar el servidor "io" de sockets dentro de la petición POST