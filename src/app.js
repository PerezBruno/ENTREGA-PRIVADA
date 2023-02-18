const express = require("express");

const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")


const BASE_PREFIX = "api";


const PORT = 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(`/${BASE_PREFIX}/products` , productRoutes);

app.use(`/${BASE_PREFIX}/carts` , cartsRoutes);


  app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
  });
  