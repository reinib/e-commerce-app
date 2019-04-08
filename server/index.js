//Configure the env file
require("dotenv").config();

//Middlewares
//Configure body-parser so you can retrieve values from the req.body, if not the req.body will be undefined.
const bodyParser = require("body-parser");
//Require the session for saving user data and giving a user a unique experience.
const session = require("express-session");
//Use cors for enable cross origin sharign
const cors = require("cors");

// Controllers
// These are how we define our endpoints
//Note can name all the variable anything you want  I am just operating on convention or best practice.
//Set your admin functionality
const adminController = require("./controllers/admin_controller");
//Set your cloudinary functionality
const cloudinaryController = require("./controllers/cloudinary_controller");
//Set your user functionality.
const userController = require("./controllers/user_controller");
// Set your products funtionality.
const productController = require("./controllers/products_controller");

//Import your mongoose module to connect to your mongodb database instance using it's connection string.
const mongoose = require("mongoose");
//Set instance of the express server to a variable
const app = express();
//  Set instance of the express server to a variable
const app = express();
//Define the Port your will be running your server on.
//NOTE: Make sure the Port is the same as the proxy.
const PORT = 5000;
// DB Config
const db = require("../config/keys").mongoURI;
//Connect the mongoose to the database using it's connect method.
mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("Database Error--------------", err));

// Middleware
// For initializing the req.body. If the middlewar is not used, the req.body is undefined.
app.use(bodyParser.json());

// For storing cookies for the user.
app.use(
  session({
    // Create a secret for the cookie store it in .env file
    // Secret can be anythinng.
    secret: process.env.SESSION_SECRET,
    //  This is for resaving the cookie false, if true can cause . memory leak.
    resave: false,
    // Save Unitialized best false, unless connect to a database.
    saveUninitialized: false,
    cookie: {
      // The max age of the cookie
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

//  Allow cross orgin requests.
app.use(cors());

// User endpoints
// Use when retrieving user data from request session. We middleware we defined earlier.

setTimeout(() => {
  // Read the user's session.
  app.get("/api/user-data", userController.readUserData);

  //  Add an  item to cart.
  app.post("/api/user-data/cart", userController.addToCart);

  // Remove an item from the cart.
  // Use request parameter to remove item from cart since you are looking for a specific item in the cart.
  app.delete("/api/user-data/cart/:id", userController.removeFromCart);

  // When user login
  app.post("/api/login", userController.login);

  // NO NEED FOR A REGISTER SINCE YOU'RE USING AUTH0.
  // Just need a login, since you are logging from your social media provider no need to register, only looks if a user already has an account.

  // When the user logouts
  app.post("/api/logout", userController.logout);

  // Products Endpoints
  // Getting all the products
  app.get("/api/products", productsController.readAllProducts);

  // Getting a specified product
  // Use a request parameter, since retrieving a specified product.
  app.get("/api/products/:id", productsController.readProduct);

  // Admin Endpoints
  // Gets the admin users.
  app.get("/api/users", adminController.getAdminUsers);

  // When admin creates a product. No need for request parameter in this case. Since we ar inserting data to database.
  app.post("/api/products", adminController.createProduct);

  // When admin updates a current product. NEED a request parameter since updating a specific product based on the id.
  app.put("/api/products/:id", adminController.deleteProduct);
}, 200);

// Then listen on the port
app.listen(PORT, () => console.log("Listening on Port:", PORT));
