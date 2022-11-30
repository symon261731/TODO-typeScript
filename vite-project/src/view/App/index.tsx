import React, { useEffect } from 'react';
import { useStore } from '../../data/stores/useToDoStore'
import styles from './index.module.scss'

import Form from '../components/Form/Form'
import OneTask from '../components/OneTask/OneTask'

export const App: React.FC = () => {
    const tasks = useStore(state => state.tasks);
    console.log(tasks);
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <Form></Form>
            </section>
            <section className={styles.articleSection}>
                {tasks && (tasks?.map((el: any) => <OneTask key={el.id} id={el.id} title={el.title} createdAt={el.createdAt} />))}

                {!tasks &&
                    (<p className={styles.articleSorry} > sorry but not task yet</p>)
                }
            </section>

        </article >
    );
}