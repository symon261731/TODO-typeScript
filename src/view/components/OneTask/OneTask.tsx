import React, { useCallback, useState } from 'react';
import { useStore } from '../../../data/stores/useToDoStore';

import styles from './OneTask.module.scss'
interface taskProp {
    id: string;
    title: string;
    createdAt: number;
}

const OneTask: React.FC<taskProp> = (prop) => {
    const [updateTask, removeTask, doneTask] = useStore(state => [state.updateTask, state.removeTask, state.doneTask]);
    const [isInput, setIsInput] = useState(false);
    const [newTitle, setNewTitle] = useState(prop.title);
    const [checked, setChecked] = useState(false);

    const updateValue = useCallback(() => {
        updateTask(prop.id, newTitle);
        setIsInput(!isInput);
    }, [newTitle])

    const deleteThisTask = useCallback(() => {
        removeTask(prop.id);
    }, [newTitle]);

    const doneThisTask = useCallback(() => {
        setChecked(!checked);
        doneTask(prop.id);
    }, [checked]);

    return (
        <div className={styles.container}>
            <div className={styles.oneCard}>
                {isInput === false && (

                    <div className={styles.div}>
                        <input
                            onChange={() => doneThisTask()}
                            checked={checked}
                            type="checkbox"
                            className={styles.checkbox} />
                        <p className={checked === true ? (`${styles.notWind} ${styles.true}`) : (styles.notWind)}>
                            {prop.title}
                        </p>
                    </div>

                )}

                {isInput === true && (
                    <>
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className={styles.input}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateValue();
                            }}
                            className={styles.confirm}
                            type='button'
                        >
                            ✓
                        </button>
                    </>
                )}
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => setIsInput(!isInput)}
                    className={styles.editButton}>Edit</button>
                <button
                    onClick={() => deleteThisTask()}
                    className={styles.button}
                    type='button'>X</button>
            </div>
        </div>
    )
}

export default OneTask;