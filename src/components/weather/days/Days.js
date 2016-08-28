import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import styles from './Days.css';

function Days({ days, onDayClick, className }) {
    return (
        <div className={classNames(styles.root, className)}>
            {days.map(({ dt, high, low }) => {
                return (
                    <div key={dt} onClick={() => onDayClick(dt)} className={styles.day}>
                        <span className={styles.label}>
                            {moment.unix(dt).utc().format('ddd')}
                        </span>
                        <span className={styles.high}>
                            {Math.round(high)}&deg;
                        </span>
                        <span className={styles.low}>
                            {Math.round(low)}&deg;
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default Days;
