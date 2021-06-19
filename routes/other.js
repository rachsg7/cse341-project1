const path = require('path');

const express = require('express');

const otherController = require('../controllers/other');

const router = express.Router();

router.get('/week8', otherController.getWeek8);

router.get('/week9/:page', (req, res, next) => {
    const page = req.params.page;
    otherController.getWeek9(page, (pokemon) => {
        res.render('pokemon', {
            pokemonList: pokemon,
            page: page
        })
    })
});

module.exports = router;