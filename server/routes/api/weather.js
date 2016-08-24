'use strict';

const express = require('express');
const fetch = require('isomorphic-fetch');
const config = require('../../config');
const router = express.Router();

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5';

// http://localhost:6060/api/weather/forecast/uk/london/
router.get('/forecast/:country/:city', (req, res, next) => {
    fetch(`${API_ENDPOINT}/forecast?q=${req.params.country},${req.params.city}&mode=json&units=metric&appid=${config.OPEN_WEATHER_APP_ID}`)
        .then(response => response.json())
        .then(
            json => res.json(json),
            err => next(err)
        );
});

module.exports = router;
