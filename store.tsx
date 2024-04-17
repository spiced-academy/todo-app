import { SetState, GetState, StoreApi, create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Task = {
  completed: boolean;
  title: string;
};

type State = {
  funMode: boolean;
  setupMode: boolean;
  finishSetup: () => void;
  activeList: string | null;
  setActiveList: (newActiveList: string) => void;
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
  toggleFunMode: () => void;
  countingTasks: Task[];
  setCountingTasks: (newCountingTasks: Task[]) => void;
  countCompletedTasks: number;
  countActiveTasks: number;
  setCountCompletedTasks: () => void;
  setActiveTasks: () => void;
};

type ZustandSet = (partial: Partial<State> | ((state: State) => Partial<State>)) => void;

export const useTaskStore = create<State>()(
  persist(
    (set: ZustandSet, get: GetState<State>, api: StoreApi<State>) => ({
      funMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),
      activeList: null,
      setActiveList: (newActiveList) => set({ activeList: newActiveList }),
      searchTerm: "",
      setSearchTerm: (newSearchTerm) => set({ searchTerm: newSearchTerm }),
      toggleFunMode: () =>
        set((state) => ({
          funMode: !state.funMode,
        })),
      countingTasks: [],
      setCountingTasks: (newCountingTasks) => set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: () => {
        const count = get().countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        set({ countCompletedTasks: count });
      },

      setActiveTasks: () => {
        const countCompleted = get().countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        const active = get().countingTasks.length - countCompleted;
        set({ countActiveTasks: active });
      },
    }),
    {
      name: "task-tango-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type { State, Task }; // Export the State type