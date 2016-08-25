import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import weather from './weather/weather';

const rootReducer = combineReducers({
    weather,
    routing: routerReducer
});

export default rootReducer;
