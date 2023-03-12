const fs = require("fs");


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }


  async generateIndex(listaProductos) {
    try {
      if (listaProductos.length === 0) return 1;
      return listaProductos[listaProductos.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: armyManager.js:17 ~ ArmyManager ~ generateIndex ~ error",
        error
      );
    }
  }


  async addProducts({ title, description, price, thumbnail, code, stock, id, status, category}) {
    const listaProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
    const newId = await this.generateIndex(listaProductos);
    id = newId;
    status = true;
    const verificarCode = listaProductos.some((product) => {
      return product.code === code;
    });
    if (verificarCode) {
      return {message: "el valor del CODE ya se encuentra asignado a otro producto"};
    } else if (
      title != "" &&
      description != "" &&
      price != "" &&
      stock != "" &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      stock != undefined &&
      code != "" &&
      code != undefined &&
      category != "" &&
      category != undefined
    ) {
      try {
        listaProductos.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
          category,
          id,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(listaProductos));
        return {message: "Producto cargado correctamente"};
      } catch (error) {
        console.log("Este es el error de la promesa escrituraAsync", error);
      }
    } else {
      return {message: "todos los parametros son requeridos"};
    }
  }


  async getProducts() {
    try {
      const listaProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      return listaProductos;
    } catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    try {
      
      let productos = await this.getProducts()//JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      let resultadoId = productos.find((e) => e.id === id);
      if (resultadoId) {
        return resultadoId;
      } else {
        return {message: "Product Not found"};
      }
    } catch (error) {
      console.log("🚀 ~ file: ProductManager.js:91 ~ ProductManager ~ getProductById= ~ error", error)
    }
  };


  updateProduct = async (id, data) => {
    let listaProductos = await this.getProducts()
    let resultadoId = listaProductos.find((e) => e.id === id)
    
    try {
      let productoAActualizar = await this.getProductById(id);
      let productoIndex = listaProductos.findIndex((e) => e.id === id);
      
      listaProductos[productoIndex] = {
        ...productoAActualizar,
        ...data,
        id: id,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(listaProductos));
      return {message: "Producto editado correctamente"};
    } catch (error) {
    console.log("🚀 ~ file: ProductManager.js:112 ~ ProductManager ~ updateProduct= ~ error", error)

    }
  };




  deleteProduct = async (id) => {
    try {
      let listaProducto =
        await this.getProducts();
        listaProducto = listaProducto.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(listaProducto));
      return {message: "Producto eliminado"}
    } catch (error) {
    console.log("🚀 ~ file: ProductManager.js:128 ~ ProductManager ~ deleteProduct ~ error", error)

    }
  };
}


module.exports = ProductManager;
