const path = require('path');

const express = require('express');

const otherController = require('../controllers/other');

const router = express.Router();

router.get('/week8', otherController.getWeek8);

module.exports = router;