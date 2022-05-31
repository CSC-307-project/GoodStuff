const mongoose = require("mongoose");
//var ObjectId = require("mongodb").ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: "No user is login",
      trim: true,
    },
    archived: {
      type: Boolean,
      required: "Status is required",
      default: false,
    },
    title: {
      type: String,
      required: "Title is required",
      trim: true,
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    address: {
      type: String,
      required: "Address is required",
      trim: true,
    },
    cordinates: [
      {
        type: Number,
        required: "Cordinates are required",
        trim: true,
      },
    ],
    description: {
      type: String,
      required: "Description is required",
      trim: true,
    },
    image: {
      type: String,
      required: "Image URL is required",
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { collection: "product_list" }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
