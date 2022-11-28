import React, { useEffect } from 'react';
import { useStore } from '../../data/stores/useToDoStore'
import styles from './index.module.scss'

import Form from '../components/Form/Form'
import OneTask from '../components/OneTask/OneTask'

export const App: React.FC = () => {
    const [tasks, createTask, updateTask, removeTask] = useStore(state =>
        [
            state.tasks,
            state.createTask,
            state.updateTask,
            state.removeTask,
        ]);

    console.log(tasks);

    useEffect(() => {
        createTask('abcderf')
    }, [])

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <Form></Form>
            </section>
            <section className={styles.articleSection}>
                {tasks.map(el => <OneTask key={el.id} info={el}></OneTask>)}
            </section>

        </article>
    );
}