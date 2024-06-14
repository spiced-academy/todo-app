export const COMPLETE_TASK = "COMPLETE_TASK";
type COMPLETE_TASK = typeof COMPLETE_TASK;

export interface CompleteTaskPayload {
    id: string;
}

export interface CompleteTaskAction { type: COMPLETE_TASK, payload: CompleteTaskPayload };

