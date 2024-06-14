export const SET_TASKS = "SET_TASKS";
type SET_TASKS = typeof SET_TASKS;

export type SetTasksPayload = ITask[];

export interface SetTasksAction { type: SET_TASKS, payload: SetTasksPayload };


