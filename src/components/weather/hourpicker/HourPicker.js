import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import styles from './HourPicker.css';

const UNIX_HOUR = 3600;

function HourPicker({ time, minTime, maxTime, onChange, className, ...other }) {
    return (
        <input {...other}
            type="range"
            value={time}
            min={minTime}
            max={maxTime}
            step={UNIX_HOUR * 3}
            onChange={e => onChange(e.target.value)}
            disabled={minTime === maxTime}
            className={classNames(styles.root, className)} />
    );
}

export default HourPicker;
