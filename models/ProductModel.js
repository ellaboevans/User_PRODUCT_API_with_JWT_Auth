const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name "],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price "],
    },
    quantity: {
      type: Number,
      required: [true, "Provide a quantity"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
