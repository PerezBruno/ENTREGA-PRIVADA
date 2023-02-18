const { Router } = require("express");

const ProductManager = require("../../src/ProductManager")

const productManager = new ProductManager("./products/productos.json")


const router = Router();


// debe listar todos los productos incluir limit
router.get(`/`, async (req, res) => {
    const products = await productManager.getProducts()
    const limit = Number(req.query.limit);
     if(limit) {
       return res.status(200).json(products.slice(0, limit));
     } else 
     return res.status(200).json(products);
 })


 //debe traer sólo el producto seleccionado
 router.get("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product){
      return res.status(404).json(product);
    }else{
      res.status(200).json(product);
    }
  });

  // debe agregar nuevos productos
  router.post(`/`, async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const carga = await productManager.addProducts(req.body)
    if(!carga){
      return res.status(400).json(carga);
    }else{
      res.status(200).json(carga)
    }
  });
 

  //toma un producto y lo actualiza
   router.put(`/:pid`, async (req, res) => {

    const productoAActualizar = await productManager.updateProduct(Number(req.params.pid), req.body);
    res.status(200).json(productoAActualizar);

   });


   //elimina un producto
   router.delete(`/:pid`, async (req, res) => {
    const producto = await productManager.deleteProduct(Number(req.params.pid));
	  res.status(200).json(producto);
   });


module.exports = router;
