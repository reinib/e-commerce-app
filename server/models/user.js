const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define your Useer Collection Objects Structure
// with datatypes, we'll be using Auth0 for authentication in the future.
const user = new Schema({
  // This is where the user will login
  // For now we will be inserting test data
  name: String,
  email: String,
  username: String,
  auth0_id: String
});

// Export the model on the mongoose.
// So this model will be inserted to the databse
module.exports = mongoose.model("User", user);
