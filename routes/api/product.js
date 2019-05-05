const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Product Model
const Product = require("../../models/Product");
//Load Validation

const validaeProductInput = require("../../validation/product");

// @route GET api/products/test
// @desc Tests products route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

// @route GET api/products/all
// @desc Get all products
// @access Public
router.get("/all", (req, res) => {
  const errors = {};

  Product.find()
    .then(products => {
      if (!products) {
        errors.noproducts = "There are no products";
        return res.status(404).json(errors);
      }
      res.json(products);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/name/:name
// @desc Get product by name
// @access Public
router.get("/name/:name", (req, res) => {
  const errors = {};

  Product.find({ name: req.params.name })
    .then(product => {
      if (!product) {
        errors.noproduct = "there is no product with this name";
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/category/:category
// @desc Get product by name
// @access Public
router.get("/category/:category", (req, res) => {
  const errors = {};
  Product.find({ category: req.params.category })
    .then(product => {
      if (!product) {
        errors.noproduct = "there is no product in this category";
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route Post api/products
// @desc Create a product
// @access Public
router.post("/", (req, res) => {
  // Validation
  const { errors, isValid } = validaeProductInput(req.body);

  //check Validation
  if (!isValid) {
    // Return anu errors with 400 status
    return res.status(400).json(errors);
  }
  // Get fields
  const productFields = {};
  if (req.body.name) productFields.name = req.body.name;
  if (req.body.category) productFields.category = req.body.category;
  if (req.body.prizeFourn) productFields.prizeFourn = req.body.prizeFourn;
  if (req.body.prizeSell) productFields.prizeSell = req.body.prizeSell;
  if (req.body.quantity) productFields.quantity = req.body.quantity;

  Product.findOne({ name: req.body.name }).then(product => {
    // Check if name existe
    if (product) {
      // update
      Product.findOneAndUpdate(
        { name: req.body.name },
        { $set: productFields },
        { new: true }
      ).then(product => res.json(product));
      //console.log(req.body.name);
    } else {
      Product.findOne({ name: productFields.name }).then(product => {
        if (product) {
          errors.name = "That product already exist";
          res.status(400).json(errors);
        }

        //Save Product
        new Product(productFields).save().then(product => res.json(product));
      });
    }
  });
});

//  @route PUT api/products/:id
//  @desc update a product
//  @acess Public
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, product) => {
      if (err) return next(err);
      res.send("Product updated");
    }
  );
});

//  @route DELETE api/products/:id
//  @desc Delete a product
//  @acess Public
router.delete("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
