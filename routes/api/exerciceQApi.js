const express = require("express");
const router = express.Router();
const gravatr = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const ExerciceQ = require("../../models/exerciceQ");

module.exports = router;

// routes
router.post('/add', addExerciceQ);
router.post('/getById', getByIdExerciceQ);
router.get('/', getAllExerciceQ);
router.post('/update', updateAllExerciceQ);
module.exports = router;

function addExerciceQ(req, res, next) {
    add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}
function updateAllExerciceQ(req, res, next) {
    updateAll(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}
function getByIdExerciceQ(req, res, next) {
    getById(req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAllExerciceQ(req, res, next) {
      getAll()
        .then(exercises => res.json(exercises))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

async function add(EQ) {
    const exerciseQ = new ExerciceQ();
    exerciseQ.question = EQ.question;
    exerciseQ.firstSugg = EQ.firstSugg;
    exerciseQ.secondSugg = EQ.secondSugg;
    exerciseQ.thirdSugg = EQ.thirdSugg;
    exerciseQ.correctAns = EQ.correctAns;
    exerciseQ.lesson = EQ.lesson;
    await exerciseQ.save();
}
async function updateAll() {
    const allEF = await ExerciceQ.find();

    allEF.forEach(async element => {
        element.correctAns = 'A';
        await element.save();
    });
}
async function getAll() {
    return await ExerciceQ.find();
}

async function getById(id) {
    return await ExerciceQ.findById(id.id);
}
