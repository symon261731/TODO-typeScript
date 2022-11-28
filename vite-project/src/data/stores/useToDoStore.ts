import create from 'zustand';
import { GenerateId } from '../helpers'
interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[],
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}


export const useStore = create<ToDoStore>((set, get) => ({

    tasks: [],
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: GenerateId(),
            title,
            createdAt: Date.now(),
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
        tasks: tasks.filter(el => el.id !== id)
    },
}))





