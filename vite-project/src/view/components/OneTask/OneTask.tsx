import React from 'react';

import styles from './OneTask.module.scss'
interface taskProp {
    id: string;
    title: string;
    createdAt: number;
}

const OneTask: React.FC<taskProp> = (prop) => {
    return (
        <div className={styles.oneCard}>
            <p className={styles.notWind}>{prop.title}</p>
            <button className={styles.button} type='button'>X</button>
        </div>
    )
}

export default OneTask;