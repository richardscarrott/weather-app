import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import styles from './Hour.css';

function Hour({ dt, main: { temp }, className }) {
    return (
        <div className={classNames(styles.root, className)}>
            <span className={styles.date}>
                {moment.unix(dt).utc().format('dddd Do MMMM, HH:mm')}
            </span>
            <span className={styles.temp}>
                {Math.round(temp)}&deg;
            </span>
        </div>
    );
}

export default Hour;
