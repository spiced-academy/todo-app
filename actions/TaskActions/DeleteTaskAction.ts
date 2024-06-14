export const DELETE_TASK = "DELETE_TASK";
type DELETE_TASK = typeof DELETE_TASK;

export interface DeleteTaskPayload {
    id: string;
}

export interface DeleteTaskAction { type: DELETE_TASK, payload: DeleteTaskPayload };
