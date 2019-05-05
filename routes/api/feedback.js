const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//feedback model
const Feedback = require("../../models/Feedback");

// Profile Model
const Profile = require("../../models/Profile");

//Validation
const validateFeedbackInput = require("../../validation/feedback");

// @route Get api/feedback/test
// @desc Tests feedbacks route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Feedback work" });
});

// @route Get api/feedback
// @desc Get feedback
// @access Public
router.get("/", (req, res) => {
  Feedback.find()
    .sort({ date: -1 })
    .then(feedback => res.json(feedback))
    .catch(err =>
      res.status(404).json({ nofeedbackfound: "No feedbacks found  " })
    );
});

// @route DELETE api/feedback/:id
// @desc Delete feedback
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Feedback.findById(req.params.id).then(feedback => {
        //Check fo feedback owner
        if (feedback.user.toString() !== req.user.id) {
          return res.status(401).json({ noauthorized: "User not authorized" });
        }

        //Delete
        feedback
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ feedbacknotfound: "feedback  not found " })
          );
      });
    });
  }
);

// @route Get api/feedback/:id
// @desc Get feedback by id
// @access Public
router.get("/:id", (req, res) => {
  Feedback.findById(req.params.id)
    .then(feedback => res.json(feedback))
    .catch(err =>
      res
        .status(404)
        .json({ nofeedbackfound: "No feedback found with that id " })
    );
});

// @route POST api/feedback
// @desc create a feedback
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFeedbackInput(req.body);

    //Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newFeedback = new Feedback({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newFeedback.save().then(feedback => res.json(feedback));
  }
);

// @route POST api/feedback/like/:id
// @desc Like feebacks
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Feedback.findById(req.params.id)
        .then(feedback => {
          if (
            feedback.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status
              .status(400)
              .json({ alreadyliked: " user already likes the feeback" });
          }
          // Add user id to like array
          feedback.likes.unshift({ user: req.user.id });
          feedback.save().then(feedback => res.json(feedback));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: " Feedback already liked" })
        );
    });
  }
);

// @route POST api/feedback/unlike/:id
// @desc Like feebacks
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Feedback.findById(req.params.id)
        .then(feedback => {
          if (
            feedback.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status
              .status(400)
              .json({ notliked: " You have not yet liked the feebacks" });
          }
          // Get the remove index
          const removeIndex = feedback.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          feedback.likes.splice(removeIndex, 1);

          // Save
          feedback.save().then(feedback => res.json(feedback));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: " Post already unliked" })
        );
    });
  }
);

// @route POST api/feedback/comment/:id
// @desc Add comment to feedback
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFeedbackInput(req.body);

    //Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Feedback.findById(req.params.id)
      .then(feedback => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments arrray
        feedback.comments.unshift(newComment);

        //Save
        feedback.save().then(feedback => res.json(feedback));
      })
      .catch(err =>
        res.status(404).json({ feedbacknotfoun: " No feedback found" })
      );
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Feedback.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ Feedbacknotfound: "No post found" })
      );
  }
);
module.exports = router;
