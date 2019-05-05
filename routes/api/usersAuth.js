const express = require("express");
const router = express.Router();
const gravatr = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load Input Validation
const validaeResgisterInput = require("../../validation/resgister");
const validaeLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));


// @route POST api/users/resgister
// @desc resgister user
// @access Public
router.post("/register", register);

// @route GET api/users/getbyemail
// @desc get user by username
// @access Public
router.post("/getbyemail", getUserByEmail);




function getUserByEmail(req, res, next) {
    getByEmail(req.body)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
}
async function getByEmail(userParam) {
    return await User.findOne({ username: userParam.username });
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

function register(req, res, next) {
    create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

// @route POST api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validaeLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email

  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload
        // sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
