const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

// @GET /api/products
// @desc Fetch all products
// @access Private

const GetProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(400).json({ message: "No products found" });
  res.send(products);
});

// @GET /api/products/:productID
// @desc Fetch single product
// @access Private

const GetProduct = asyncHandler(async (req, res) => {
  const id = req.params.productID;
  const product = await Product.findById({ _id: id });
  if (!product) return res.status(404).json({ message: "No product found" });
  try {
    const singleProduct = await Product.findOne({ _id: id });
    res.json(singleProduct);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// @POST /api/products
// @desc Create a product
// @access Private

const CreateProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity, description } = req.body;

  // Let Validate Fields before making produtcs

  if (!name || !price || !quantity || !description)
    return res.status(400).json({ message: "All fields are required" });
  const product = await new Product({
    name,
    price,
    quantity,
    description,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// @PATCH /api/products/:productID
// @desc Update a product
// @access Private

const updatedProduct = asyncHandler(async (req, res) => {
  const id = req.params.productID;
  const product = await Product.findById({ _id: id });
  if (!product) return res.status(404).json({ message: "No product found" });
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: id,
    });
    res.json(deletedProduct);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// @DELETE /api/products/:productID
// @desc Delete a product
// @access Private
const DeleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.productID;
  const { name, price, quantity, description } = req.body;
  const product = await Product.findById({ _id: id });
  if (!product)
    if (!product) return res.status(404).json({ message: "No product found" });
  try {
    const updatedProduct = await Product.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          price,
          quantity,
          description,
        },
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = {
  GetProducts,
  GetProduct,
  CreateProduct,
  updatedProduct,
  DeleteProduct,
};
