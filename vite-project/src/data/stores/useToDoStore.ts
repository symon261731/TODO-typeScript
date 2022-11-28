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

    tasks: [{
        id: '123',
        title: 'asdg',
        createdAt: 121241
    }],
    createTask: (title) => {
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
    updateTask: (id, title) => { },
    removeTask: (id) => { },
}))





