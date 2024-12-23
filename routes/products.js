const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Central error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next).catch(next));
};

// =============Product Routes=============
// GET API
router.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find().select("-__v");
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  })
);

// GET API for single product
router.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).select("-__v");
    if (!product) {
      res.status(400).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  })
);

// POST API
router.post(
  "/products",
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  })
);

// PUT API
router.put(
  "/products/:id",
  asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: product,
    });
  })
);

router.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  })
);

module.exports = router;
