const express = require("express");
const router = express.Router();
const gravatr = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Grade = require("../../models/Grades");

module.exports = router;


// @route GET api/gradesApi/test
// @desc Tests grades route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route GET api/gradesApi/getAllGrades
// @desc Get all grades route
// @access Public
router.get('/getAllGrades', getAllGrades);

// @route GET api/gradesApi/add
// @desc add a grade route
// @access Public
router.post('/add', addGrade);

function getAllGrades(req, res, next) {
        getAll()
        .then(grades => res.json(grades))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function addGrade(req, res, next) {
    add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

async function add(G) {
    console.log(G);
    let grade = new Grade();
    if (
        await Grade.findOne({
            userId: G.userId,
            questionId: G.questionId
        })
    ) grade = await Grade.findOne({
        userId: G.userId,
        questionId: G.questionId
    });

    Object.assign(grade, G);
    await grade.save();
}

async function getAll() {
    return await Grade.find();
}

async function getById(id) {
    return await Grade.findById(id.id);
}

async function _delete(id) {
    await Grade.findByIdAndRemove(id);
}
