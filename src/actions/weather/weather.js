import * as api from 'api/weather/weather';
import moment from 'moment';

export const FETCH_WEATHER_FORECAST_REQUEST = 'FETCH_WEATHER_FORECAST_REQUEST';
export const FETCH_WEATHER_FORECAST_SUCCESS = 'FETCH_WEATHER_FORECAST_SUCCESS';
export const FETCH_WEATHER_FORECAST_FAILURE = 'FETCH_WEATHER_FORECAST_FAILURE';
// export const CHANGE_ACTIVE_WEATHER_FORECAST = 'CHANGE_ACTIVE_WEATHER_FORECAST';
export const CHANGE_ACTIVE_HOUR_WEATHER_FORECAST = 'CHANGE_ACTIVE_HOUR_WEATHER_FORECAST';
export const CHANGE_ACTIVE_DAY_WEATHER_FORECAST = 'CHANGE_ACTIVE_DAY_WEATHER_FORECAST';

function fetchForecastFailure(error) {
    return {
        type: FETCH_WEATHER_FORECAST_FAILURE,
        payload: error.message
    };
}

function fetchForecastSuccess(response) {
    return {
        type: FETCH_WEATHER_FORECAST_SUCCESS,
        meta: {
            receivedAt: moment().utc().unix()
        },
        payload: response
    };
}

function fetchForecastRequest() {
    return {
        type: FETCH_WEATHER_FORECAST_REQUEST
    };
}

function fetchForecast() {
    return dispatch => {
        dispatch(fetchForecastRequest());
        return api.fetchForecast()
            .then(
                response => dispatch(fetchForecastSuccess(response)),
                error => dispatch(fetchForecastFailure(error))
            )
            .catch(ex => {
                console.error(ex.stack); // eslint-disable-line no-console
            });
    };
}

function forecastExpired(forecast) {
    const { data, lastUpdated } = forecast;
    return !data || moment().utc().unix() > moment.unix(lastUpdated).utc().add(5, 'minutes').unix();
}

function shouldFetchForecast(state) {
    const { weather: { forecast } } = state;
    const { isFetching } = forecast;
    if (isFetching || !forecastExpired(forecast)) {
        return false;
    }
    return true;
}

export function fetchForecastIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchForecast(getState())) {
            return dispatch(fetchForecast());
        }
    };
}

export function changeActiveForecastHour(dt) {
    return {
        type: CHANGE_ACTIVE_HOUR_WEATHER_FORECAST,
        payload: dt
    };
}

export function changeActiveForecastDay(dt) {
    return {
        type: CHANGE_ACTIVE_DAY_WEATHER_FORECAST,
        payload: dt
    };
}
