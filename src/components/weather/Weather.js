import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { fetchForecastIfNeeded, changeActiveForecastHour, changeActiveForecastDay } from '../../actions/weather/weather';
import Days from './days/Days';
import Hour from './hour/Hour';
import HourPicker from './hourpicker/HourPicker';
import styles from './Weather.css';

// WOULDDO: Define propTypes!
// WOULDDO: Design component API with more defined SoC
// WOULDDO: Loading spinner
// WOULDDO: Error / Retry component

class Weather extends Component {

    componentDidMount() {
        const { onMount } = this.props;
        onMount();
    }

    render() {
        const { activeHour, activeDay, days, onForecastDayChange, onForecastHourChange, isFetching, error } = this.props;

        if (isFetching) {
            return (<div className={styles.root}>Loading...</div>);
        } else if (error) {
            return (<div className={styles.root}>Error...</div>);
        } else if (activeHour) {
            const time = activeHour.dt;
            const minTime = activeDay.hourly[0];
            const maxTime = activeDay.hourly[activeDay.hourly.length - 1];
            return (
                <div className={styles.root}>
                    <Helmet title="Weather Forecast" />
                    {activeHour ? <Hour {...activeHour} className={styles.module} /> : null}
                    <HourPicker time={time} minTime={minTime} maxTime={maxTime} onChange={onForecastHourChange} className={styles.module} />
                    {days.length ? <Days days={days} onDayClick={onForecastDayChange} className={styles.module} /> : null}
                </div>
            );
        }

        return null;
    }
}

Weather.fetchData = ({ dispatch }) => {
    return dispatch(fetchForecastIfNeeded());
}

const EMPTY_DAYS = [];

// WOUDDO: Write unit tests, jest, snapshots, scalable.

// WOULDDO: use 'selectors' and memoize this with 'reselect' or similar lib to
// ensure the compution of derived data doesn't cause this component to re-render
// even if it hasn't technically changed.
function mapStateToProps(state) {
    const { weather: { forecast } } = state;
    const { isFetching, error, active, data } = forecast;
    let days = EMPTY_DAYS;
    let activeHour = null;
    let activeDay = null;
    if (data) {
        const { entities, result } = data;
        days = result.map(day => entities.days[day]);
        activeHour = entities.hours[active];
        activeDay = entities.days[moment.unix(active).utc().startOf('day').unix()];
    }
    return {
        isFetching,
        error,
        activeHour,
        activeDay,
        days
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onMount() {
            Weather.fetchData({ dispatch });
        },
        onForecastHourChange(dt) {
            dispatch(changeActiveForecastHour(dt));
        },
        onForecastDayChange(dt) {
            dispatch(changeActiveForecastDay(dt));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
