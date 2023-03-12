const fs = require("fs");

const ProductManager = require("./ProductManager");

const productManager = new ProductManager("./products/productos.json");

class Carts {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async generateIndex(listaCarros) {
    try {
      if (listaCarros.length === 0) return 1;
      return listaCarros[listaCarros.length - 1].id + 1;
    } catch (error) {
    console.log("🚀 ~ file: Carts.js:18 ~ Carts ~ generateIndex ~ error", error)

    }
  }

  async createCart(id, products = []) {
    let listaCarros = JSON.parse(
      await fs.promises.readFile(this.path, "utf-8")
    );
    const newId = await this.generateIndex(listaCarros);
    try {
      listaCarros.push({
        id: newId,
        products,
      });
      await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
      return { message: "Carrito creado con exito" };
    } catch (error) {
    console.log("🚀 ~ file: Carts.js:38 ~ Carts ~ createCart ~ error", error)

    }
  }

  getCartById = async (id) => {
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const resultadoId = listaCarros.find((e) => e.id === id);
        let nuevoObjeto=[];
        
        for (let i in resultadoId.products)
        nuevoObjeto.push({
          quantity: resultadoId.products[i].quantity,
          product: await productManager.getProductById(resultadoId.products[i].product)
        })

      if (resultadoId) {
        return nuevoObjeto
      } else {
        return { message: "Not found" };
      }
    } catch (error) {
    console.log("🚀 ~ file: Carts.js:61 ~ Carts ~ getCartById= ~ error", error)
    }
  };

  addProductInCartById = async (id, product) => {
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      let cartToUpdate = listaCarros.find((e) => e.id === id);

      let prod = cartToUpdate.products.find((e) => {
        return e.product === product;
      });
      if (!prod) {
        cartToUpdate.products.push({ product, quantity: 1 });
        await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
        return { message: "Producto cargado correctamente" };
      } else {
        let nuevaCantidad = prod.quantity + 1;
        let posicion = cartToUpdate.products.indexOf(prod);

        let edit = cartToUpdate.products.splice(posicion, 1, {
          product,
          quantity: nuevaCantidad,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
        return { message: "Producto cargado correctamente" };
      }
    } catch (error) {
    console.log("🚀 ~ file: Carts.js:92 ~ Carts ~ addProductInCartById= ~ error", error)
    }
  };
}

module.exports = Carts;
