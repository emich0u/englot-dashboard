const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Card model
const Card = require("../../models/Card");

// Profile Model
const Profile = require("../../models/Profile");

// Product Model
const Product = require("../../models/Product");

//Validation
const validateCardInput = require("../../validation/feedback");

// @route POST api/Card
// @desc create a Card
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //   const { errors, isValid } = validateFeedbackInput(req.body);

    //   //Check validation
    //   if (!isValid) {
    //     // if any errors, send 400 with errors object
    //     return res.status(400).json(errors);
    //   }

    const newCard = new Card({
      nameProduct: req.body.nameProduct,
      totPrize: req.body.totPrize,
      totQte: req.body.totQte,
      user: req.user.id
    });
    newCard.save().then(card => res.json(card));
  }
);

// @route POST api/card/addProduct/:product_id
// @desc Add card
// @access Private
router.post(
  "/addProduct/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id).then(product => {
        Card.findOne({ user: req.user.id })
          .then(card => {
            let productItem = product;
            if (card) {
              console.log(productItem);
              card.products.unshift(productItem);
              card.save().then(card => res.json(card));
              //Update

              res.json(card);
            } else {
              new Card({
                nameProduct: req.body.nameProduct,
                totPrize: req.body.totPrize,
                totQte: req.body.totQte,
                user: req.user.id
              })
                .save()
                .then(card => {
                  card.products.unshift(productItem);
                  card.save().then(card => res.json(card));
                });
            }
          })
          .catch(err =>
            res.status(404).json({ productnotfound: " product  already Added" })
          );
      });
    });
  }
);

// @route   DELETE api/posts/rmProd/:id/:product_id
// @desc    Remove comment/product from post/card
// @access  Private
router.delete(
  "/rmProd/:id/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.findById(req.params.id)
      .then(card => {
        // Check to see if comment exists
        if (
          card.products.filter(
            product => product._id.toString() === req.params.product_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ productnotexists: "Product does not exist" });
        }

        // Get remove index
        const removeIndex = card.products
          .map(item => item._id.toString())
          .indexOf(req.params.product_id);

        // Splice comment out of array
        card.products.splice(removeIndex, 1);

        card.save().then(card => res.json(card));
      })
      .catch(err => res.status(404).json({ cardnotfound: "No card found" }));
  }
);

//  @route DELETE api/card/:id
//  @desc Delete a card
//  @acess Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.findById(req.params.id)
      .then(card => card.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);
module.exports = router;
