const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  stock: Number,
});
module.exports = mongoose.model("Product", ProductSchema);