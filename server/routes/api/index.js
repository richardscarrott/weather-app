'use strict';

const express = require('express');
const weather = require('./weather');
const router = express.Router();

router.use('/weather', weather);

module.exports = router;
