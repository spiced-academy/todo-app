'use client'
import { createContext, useContext } from 'react';

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  assignTask: (taskId: string, userId: string) => void;
  completeTask: (taskId: string) => void;
  updateTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: Task[]) => void;
  setPublicTasks: (tasks: Task[]) => void;
};

// Create context
export const TasksContext = createContext<TaskContextType | null>(null);

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TasksContext);