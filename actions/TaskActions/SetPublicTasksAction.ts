export const SET_PUBLIC_TASKS = "SET_PUBLIC_TASKS";
type SET_PUBLIC_TASKS = typeof SET_PUBLIC_TASKS;

export type SetPublicTasksPayload = ITask[];

export interface SetPublicTasksAction { type: SET_PUBLIC_TASKS, payload: SetPublicTasksPayload };


