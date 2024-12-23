const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

// create express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Connect to mongoDB
mongoose.connect(MONGODB_URI);

// setting events to handle mongodb connection
const db = mongoose.connection;
// if something wrong while stting connection
db.on("error", console.error.bind(console, "Mongodb connection error:"));
// if connection is done properly
db.once("open", () => console.log("Mongodb Connected Successfully"));

// import routes
const productRouter = require("./routes/products");

// mount routes
app.use("/api/", productRouter);

// Error Handling middleware
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({
    success: false,
    error: error.message || "Server Error",
  });
});

// Setting Port
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

/*
Aapke project ke liye aapko ye files banani hongi:

1. models/
   - User.js (user schema - name, email, password etc)
   - Product.js (update to add userId field)

2. routes/
   - auth.js (login/register routes)
   - users.js (user related routes)

3. middleware/
   - auth.js (authentication middleware)

4. controllers/
   - authController.js (login/register logic)
   - userController.js (user related logic)
   - productController.js (product logic with user filtering)

5. config/
   - db.js (database configuration)

6. utils/
   - validators.js (input validation)
   - helpers.js (utility functions)

Main changes:
1. Product model mein userId field add karni hogi
2. Authentication middleware banani hogi
3. User routes aur controllers implement karne honge
4. Product routes mein user filtering add karni hogi

.env file mein JWT_SECRET add karna hoga for authentication
*/
