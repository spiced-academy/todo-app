export const ADD_TASK = "ADD_TASK";
type ADD_TASK = typeof ADD_TASK

export type AddTaskPayload = Task

export interface AddTaskAction { type: ADD_TASK, payload: AddTaskPayload };