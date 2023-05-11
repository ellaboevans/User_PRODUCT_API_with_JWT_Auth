const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const {
  GetProducts,
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productController");

// Get all products
router.get("/", verify, GetProducts);

// Create a product
router.post("/", verify, CreateProduct);

// Get a specific product with an id
router.get("/:productID", verify, GetProduct);

// Update a specific product
router.patch("/:productID", verify, UpdateProduct);

// Delete a specific Product
router.delete("/:productID", verify, DeleteProduct);

// Exports
module.exports = router;
