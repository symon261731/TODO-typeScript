import create from 'zustand';
import { GenerateId } from '../helpers'
import { devtools } from 'zustand/middleware';

interface Task {
    id: string;
    title: string;
    createdAt: number;
    done: boolean;
}

interface ToDoStore {
    tasks: Task[],
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    doneTask: (id: string) => void;
}


export const useStore = create<ToDoStore>(devtools((set, get) => ({
    tasks: [],

    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: GenerateId(),
            title,
            createdAt: Date.now(),
            done: false,
        }

        set({
            tasks: [...tasks, newTask],
        })

    },

    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map(el => ({
                ...el,
                title: el.id === id ? title : el.title
            }))
        });
    },

    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter(el => el.id !== id)
        })
    },

    doneTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((el) => ({
                ...el,
                done: el.id === id ? !el.done : el.done,
            })
            )
        })
    },
})));





