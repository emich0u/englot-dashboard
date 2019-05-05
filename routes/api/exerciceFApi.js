const express = require("express");
const router = express.Router();
const gravatr = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const ExerciceF = require("../../models/exerciceF");

module.exports = router;


// routes
router.post('/add', addExerciceF);
router.post('/getById', getByIdExerciceF);
router.get('/', getAllExerciceF);
router.post('/update', updateAllExerciceF);

function addExerciceF(req, res, next) {
      add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function updateAllExerciceF(req, res, next) {
    updateAll(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getByIdExerciceF(req, res, next) {
console.log(req.body);
    getById(req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAllExerciceF(req, res, next) {
    getAll()
        .then(exercises => res.json(exercises))
        .catch(err => {
            console.log(err);
            next(err);
        });
}


async function add(EF) {
    const exerciseF = new ExerciceF();
    exerciseF.question = EF.question;
    exerciseF.content = EF.content;
    exerciseF.correctAns = EF.correctAns;
    exerciseF.lesson = EF.lesson;
    await exerciseF.save();
}

async function updateAll(E) {
    const ex = await ExerciceF.findById(E.id);
    // ex.content = E.content;
    ex.correctAns = E.correctAns;
    // ex.question = E.question;
    await ex.save();

    /*
     *  allEF.forEach(async element => {
     * element.content =
     * 'I (go) & to dahdah yesterday and I (eat) & icecream then I (see) & a scary clown';
     * await element.save();
     * });
     */
}

async function getAll() {
    return await ExerciceF.find();
}

async function getById(id) {
    return await ExerciceF.findById(id.id);
}
