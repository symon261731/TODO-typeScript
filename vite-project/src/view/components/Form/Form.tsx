import React, { useState } from 'react';
import { useStore } from '../../../data/stores/useToDoStore';

import styles from './Form.module.scss';



const Form: React.FC = () => {
    const createTask = useStore(state => state.createTask);
    const [input, setInput] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            createTask(input);
        }} className={styles.form}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='write your TODO' type="text" className={styles.input} />
            <button type='submit' className={styles.button}>confirm</button>
        </form>)
}

export default Form;
