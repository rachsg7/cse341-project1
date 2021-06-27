const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../public/ta10.json');

router.get('/week10', (req, res, next) => {
    res.render('week10', {
        title: 'Team Activity 10',
        path: '/week10',
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insertName', (req, res, next) => {
    console.log(req.body);
    if (req.body.newName !== undefined) {
        const newName = req.body.newName;

        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName });
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;