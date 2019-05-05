const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//feedback model
const Card = require("../../models/Card");

//order model
const Order = require("../../models/Order");

// @route POST api/order/addOrder/:card_id
// @desc Add to order
// @access Private
router.post(
  "/addOrder/:card_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.findById(req.params.card_id)
      .then(card => {
        new Order().save().then(Order => {
          Order.orders.unshift(card);
          Order.save().then(Order => res.json(Order));
        });
      })
      .catch(err => res.status(404).json({ cardnotfound: " card not found " }));
  }
);

//  @route DELETE api/order/:id
//  @desc Delete a order
//  @acess Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.findById(req.params.id)
      .then(order => order.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
