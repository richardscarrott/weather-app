'use strict';

const express = require('express');
const fetch = require('isomorphic-fetch');
const moment = require('moment');
const config = require('../../config');
const router = express.Router();

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5';

/**
 * Format result by day w/ high / low temps.
 */
function format(json) {
    return json.list.reduce((days, hour) => {
        const prevDay = days[days.length - 1];
        const currentDayDt = moment.unix(hour.dt).utc().startOf('day').unix();
        if (prevDay && prevDay.dt === currentDayDt) {
            prevDay.hourly.push(hour);
            if (prevDay.high < hour.main.temp) {
                prevDay.high = hour.main.temp;
            }
            if (prevDay.low > hour.main.temp) {
                prevDay.low = hour.main.temp;
            }
        } else {
            days.push({
                dt: currentDayDt,
                high: hour.main.temp,
                low: hour.main.temp,
                hourly: [hour]
            });
        }
        return days;
    }, []);
}

router.get('/forecast/:country/:city', (req, res, next) => {
    return res.json(format(require('./weather-mock.json')));
    // fetch(`${API_ENDPOINT}/forecast?q=${req.params.country},${req.params.city}&mode=json&units=metric&appid=${config.OPEN_WEATHER_APP_ID}`)
    //     .then(response => response.json())
    //     .then(format)
    //     .then(
    //         result => res.json(result),
    //         err => next(err)
    //     );
});

module.exports = router;
