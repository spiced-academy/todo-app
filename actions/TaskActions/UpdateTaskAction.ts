export const UPDATE_TASK = "UPDATE_TASK";
type UPDATE_TASK = typeof UPDATE_TASK;

export interface UpdateTaskPayload {
    id: string;
    title: string;
}

export interface UpdateTaskAction { type: UPDATE_TASK, payload: UpdateTaskPayload };