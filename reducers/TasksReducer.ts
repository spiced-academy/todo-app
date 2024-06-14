import { TaskAction } from "@/actions/TasksActions";
import { ADD_TASK } from "@/actions/TaskActions/AddTaskAction";
import { ASSIGN_TASK, AssignTaskPayload } from "@/actions/TaskActions/AssignTaskAction";
import { UPDATE_TASK } from "@/actions/TaskActions/UpdateTaskAction";
import { DELETE_TASK, DeleteTaskPayload } from "@/actions/TaskActions/DeleteTaskAction";
import { COMPLETE_TASK, CompleteTaskPayload } from "@/actions/TaskActions/CompleteTaskAction";
import { SET_TASKS, SetTasksPayload } from "@/actions/TaskActions/SetTasksAction";

// Define reducer
export const taskReducer = (state: ITask[], action: TaskAction) => {

  switch (action.type) {
    case ADD_TASK:
      return [(action.payload as Task), ...state];
    case ASSIGN_TASK:
      return state.map(task =>
        task.id === (action.payload as AssignTaskPayload).id ? { ...task, user_id: (action.payload as AssignTaskPayload).userId } : task
      ).filter(task => task.id !== (action.payload as AssignTaskPayload).id);
    case UPDATE_TASK:
      return state.map(task =>
        task.id === (action.payload as { id: string, title: string }).id ? { ...task, title: (action.payload as { id: string, title: string }).title } : task
      );
    case DELETE_TASK:
      return state.filter(task => task.id !== (action.payload as DeleteTaskPayload).id);
    case COMPLETE_TASK:
      return state.map(task =>
        task.id === (action.payload as CompleteTaskPayload).id ? { ...task, completed: !task.completed } : task
      );
    case SET_TASKS:
      return (action.payload as SetTasksPayload);
    default:
      return state;
  }
};
