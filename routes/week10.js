const express = require('express');
const { default: fetch } = require('node-fetch');
const router = express.Router();
const week10Controller = require('../controllers/other');

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../public/ta10.json')

router.get('/', week10Controller.getWeek10);

// router.get('/fetchAll', (req, res, next) => {
//     res.json(dummyData);
// });

// router.post('/insert', (req, res, next) => {
//     /************************************************
//      * INSERT YOUR WEB ENDPOINT CODE HERE
//      ************************************************/
// });