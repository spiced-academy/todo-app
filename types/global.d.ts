export { }

declare global {
    interface ITask {
        id: string;
        title: string;
        user_id: string | null;
        new: boolean | null;
        completed: boolean | null;
        created_at: Date;
        updated_at: Date;
    }

    type Task = ITask

    // Define a type for the state and actions of the task store
    interface TaskStore {
        funMode: boolean;
        setupMode: boolean;
        finishSetup: () => void;
        activeList: string | null;
        setActiveList: (newActiveList: string) => void;
        searchTerm: string;
        setSearchTerm: (newSearchTerm: string) => void;
        toggleFunMode: () => void;
        countingTasks: ITask[];
        setCountingTasks: (newCountingTasks: ITask[]) => void;
        countCompletedTasks: number;
        countActiveTasks: number;
        setCountCompletedTasks: () => void;
        setActiveTasks: () => void;
    };

    type TaskState = "upcoming" | "done" 

}