const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
  getAdminUsers(req, res) {
    User.find().exec((err, users) => {
      if (err) console.log("Find Amin Users Error----------------", err);
      res.status(200).json({ users });
    });
  },
  createProduct(req, res) {
    // Destruct the values sent in from frontend from req.body
    const { name, desc, price } = req.body;

    let newProduct = new Product({
      name,
      desc,
      price
    });

    // Use the .save() to save model to database.
    newProduct.save();

    // Then send back the products.
    res.status(200).json({ product: newProduct });
  },

  updateProduct(req, res) {
    // Get id, since we need to update a specific product.
    // Destruct the id from the request params.
    const { id } = req.params;

    // Destruct the update data from the req.body;
    const { name, desc, price } = req.params;

    // Find the product and update it's properties
    Product.findById(id).exec((err, product) => {
      if (err) console.log("Updated Product-------------", err);
      product.name = name;
      product.desc = desc;
      product.price = price;

      // Save the product with updated data.
      product.save();

      // Then send back the data, just for testing purposes.
      res.status(200).json({ product });
    });
  },
  deleteProduct(req, res) {
    // Destruct the id from the request params, since you have to delete a specific product.
    const { id } = req.params;

    // Use an object to delet the specified product.
    Product.deleteOne({ _id: id }).exec((err, product) => {
      if (err) console.log("Delete One Error-----------", err);
      res.status(200).json({ product });
    });
  }
};
