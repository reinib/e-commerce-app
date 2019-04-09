const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Need an id, name, description, price
// Id is created by default in mongodb
const product = new Schema({
  name: String,
  desc: String,
  price: Number
});

// To create a model, use the name of the model, and the schema with the properties of the model
// that will be inserted to the datbase.
module.exports = mongoose.model("Products", product);
