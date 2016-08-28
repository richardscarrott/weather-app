import { normalize, Schema, arrayOf } from 'normalizr';
import fetch from 'utils/fetch';

const days = new Schema('days', {
    idAttribute: 'dt'
});
const hours = new Schema('hours', {
    idAttribute: 'dt'
});

days.define({
    hourly: arrayOf(hours)
});

export function fetchForecast(country = 'uk', city = 'london') {
    return fetch(`${process.env.API_ENDPOINT}/weather/forecast/${country}/${city}`)
        .then(response => normalize(response, arrayOf(days)));
}
