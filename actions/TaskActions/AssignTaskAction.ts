export const ASSIGN_TASK = "ASSIGN_TASK";
type ASSIGN_TASK = typeof ASSIGN_TASK

export interface AssignTaskPayload {
    id: string;
    userId: string;
}

export interface AssignTaskAction { type: ASSIGN_TASK, payload: AssignTaskPayload };