'use client'
import { ReactNode, useReducer } from "react";
import { TasksContext } from "@/contexts/TasksContext";
import { taskReducer } from "@/reducers/TasksReducer";

import { ADD_TASK, AddTaskPayload } from "@/actions/TaskActions/AddTaskAction";
import { ASSIGN_TASK, AssignTaskPayload } from "@/actions/TaskActions/AssignTaskAction";
import { UPDATE_TASK, UpdateTaskPayload } from "@/actions/TaskActions/UpdateTaskAction";
import { DELETE_TASK, DeleteTaskPayload } from "@/actions/TaskActions/DeleteTaskAction";
import { COMPLETE_TASK, CompleteTaskPayload } from "@/actions/TaskActions/CompleteTaskAction";
import { SET_TASKS, SetTasksPayload } from "@/actions/TaskActions/SetTasksAction";
import { SET_PUBLIC_TASKS, SetPublicTasksPayload } from "@/actions/TaskActions/SetPublicTasksAction";

// Create provider
export const TasksProvider = ({ children, initialTasks }: { children: ReactNode, initialTasks: ITask[] }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const addTask = (task: Task) => dispatch({ type: ADD_TASK, payload: task as AddTaskPayload });
  const assignTask = (taskId: string, userId: string) => dispatch({ type: ASSIGN_TASK, payload: { id: taskId, userId } as AssignTaskPayload });
  const updateTask = (taskId: string, title: string) => dispatch({ type: UPDATE_TASK, payload: { id: taskId, title } as UpdateTaskPayload });
  const deleteTask = (taskId: string) => dispatch({ type: DELETE_TASK, payload: { id: taskId } as DeleteTaskPayload });
  const completeTask = (taskId: string) => dispatch({ type: COMPLETE_TASK, payload: { id: taskId } as CompleteTaskPayload });
  const setTasks = (tasks: ITask[]) => dispatch({ type: SET_TASKS, payload: tasks as SetTasksPayload });
  const setPublicTasks = (tasks: ITask[]) => dispatch({ type: SET_PUBLIC_TASKS, payload: tasks as SetPublicTasksPayload });

  return (
    <TasksContext.Provider value={{ tasks, addTask, assignTask, updateTask, deleteTask, completeTask, setTasks, setPublicTasks }}>
      {children}
    </TasksContext.Provider>
  );
};