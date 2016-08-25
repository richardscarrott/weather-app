import { combineReducers } from 'redux';
import {
    FETCH_WEATHER_FORECAST_REQUEST,
    FETCH_WEATHER_FORECAST_SUCCESS,
    FETCH_WEATHER_FORECAST_FAILURE,
    CHANGE_ACTIVE_HOUR_WEATHER_FORECAST,
    CHANGE_ACTIVE_DAY_WEATHER_FORECAST
} from 'actions/weather/weather';

function forecast(state = {
    active: null,
    isFetching: false,
    error: null,
    lastUpdated: null,
    data: null
}, action) {
    switch(action.type) {
        case FETCH_WEATHER_FORECAST_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_WEATHER_FORECAST_SUCCESS:
            const { payload: { result, entities } } = action;
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.meta.receivedAt,
                data: action.payload,
                // Default to first hour of first day
                active: entities.hours[entities.days[result[0]].hourly[0]].dt
            };
        case FETCH_WEATHER_FORECAST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case CHANGE_ACTIVE_HOUR_WEATHER_FORECAST:
            return {
                ...state,
                active: action.payload
            };
        case CHANGE_ACTIVE_DAY_WEATHER_FORECAST:
            const { payload } = action;
            const { data } = state;
            return {
                ...state,
                active: data.entities.hours[data.entities.days[payload].hourly[0]].dt
            };
        default:
            return state;
    }
}

const weather = combineReducers({
    forecast
});

export default weather;
