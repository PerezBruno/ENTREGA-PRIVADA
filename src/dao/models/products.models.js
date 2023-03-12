const mongoose = require("mongoose");

const productsCollection = "Products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    default: true,

  },
  category:{
    type: String,
    required: true,
  }
});

const productsModel = mongoose.model(productsCollection, productsSchema);

module.exports = productsModel;
