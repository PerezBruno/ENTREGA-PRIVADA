const mongoose = require("mongoose");

const cartsCollection = "Carts";

const cartsSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  cuantity:{
    type: Number,
    required: true,
  }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;
