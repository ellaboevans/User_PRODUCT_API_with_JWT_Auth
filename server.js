const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
require("dotenv/config");

app.use(express.json());

// Import routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

// Route Middlewares
app.use("/api/users", authRoute);
app.use("/api/products", productRoute);

// Connect DB
connectDb();

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
