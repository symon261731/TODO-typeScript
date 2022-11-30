import create, { State, StateCreator } from 'zustand';
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

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState: any, ...args) => {
    if (isToDoStore(nextState)) { }
    window.localStorage.setItem('tasks', JSON.stringify(
        nextState.tasks
    ));
    set(nextState, ...args);
}, get, api);


const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState;
    } catch (err) {
        window.localStorage.setItem('tasks', '[]');
    }

    return [];
}


export const useStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
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
}))));





