const { Router } = require("express");

const Carts = require("../../src/Carts");
const ProductManager = require("../../src/ProductManager");

const router = Router();

const carts = new Carts("./products/carrito.json")
const productManager = new ProductManager("./products/productos.json")



  // debe generar un nuevo carrito
  router.post(`/`, async (req, res) => {
    const { products } = req.body;
    const carga = await carts.createCart()
    if(!carga){
      return res.status(400).json(carga);
    }else{
      res.status(200).json(carga)
    }
  });


    // debe cargar un producto al carrito seleccionado
    router.post(`/:cid/product/:pid`, async (req, res) => {
        //const { products } = req.body;
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);
        const carga = await carts.addProductInCartById(cid, pid);
	    res.status(200).json(carga);
      });
    


   //debe traer sólo los productos del carrito seleccionado
 router.get("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await carts.getCartById(id);
    if (!product){
      return res.status(404).json(product);
    }else{
      res.status(200).json(product);
    }
  });






module.exports = router;