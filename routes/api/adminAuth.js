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
const User = require("../../models/User")
const Admin = require("../../models/Admin");

// @route GET api/admin/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Admin works" }));

// @route POST api/admin/resgister
// @desc resgister user
// @access Public
router.post("/resgister", (req, res) => {
  const { errors, isValid } = validaeResgisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatr.url(req.body.email, {
        s: "200", // size
        r: "pg", //Rating
        d: "mm" //Default
      });
      const newUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

async function getAllAdmins() {
    return await Admin.find();
}

function getAllAd(req, res, next) {
    console.log('gathering data...');
         getAllAdmins()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => next(err));
}

async function getAll() {
    return await User.find().select('-hash');
}

function getAllUsers(req, res, next) {
    console.log('gathering data...');
         getAll()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => next(err));
}


// @route Get api/users/getAll
// @desc get all users from myusers
// @access Public
router.get('/getAdmins', getAllAd);

// @route Get api/users/getAll
// @desc get all users from myusers
// @access Public
router.get('/getUsers', getAllUsers);
// @route POST api/admin/login
// @desc Login admin / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validaeLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find admin by email

  Admin.findOne({ email }).then(user => {
    // check for admin
    if (!user) {
      errors.email = "Admin not found";
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

// @route GET api/admin/current
// @desc Return current admin
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
