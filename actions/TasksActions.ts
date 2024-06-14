import { AddTaskAction } from "./TaskActions/AddTaskAction";
import { AssignTaskAction } from "./TaskActions/AssignTaskAction";
import { UpdateTaskAction } from "./TaskActions/UpdateTaskAction";
import { DeleteTaskAction } from "./TaskActions/DeleteTaskAction";
import { CompleteTaskAction } from "./TaskActions/CompleteTaskAction";
import { SetTasksAction } from "./TaskActions/SetTasksAction";

// Define action types
export type ADD_TASK = 'ADD_TASK';
export type ASSIGN_TASK = 'ASSIGN_TASK';
export type UPDATE_TASK = 'UPDATE_TASK';
export type DELETE_TASK = 'DELETE_TASK';
export type SET_TASKS = 'SET_TASKS';
export type COMPLETE_TASK = 'COMPLETE_TASK';

export type TaskAction = AddTaskAction | AssignTaskAction | UpdateTaskAction | DeleteTaskAction | CompleteTaskAction | SetTasksAction;


